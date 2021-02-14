const {app, BrowserWindow, ipcMain, globalShortcut, dialog} = require("electron")
const fs = require('fs')
const path = require("path")
const {GameStateServer} = require('./backend/gamestate');
const isDev = !app.isPackaged

const {Dotadraft} = require('./backend/dotadraft');
const {loadSettings, saveSettings, resetSettings} = require('./backend/settings');
const {loadData} = require('./backend/data');

const log = require('./backend/logger').getLogger()

const settings = loadSettings()

const dotadraftApi = new Dotadraft(settings.dotadraft_api_server)
dotadraftApi.prewarm()
setInterval(() => dotadraftApi.prewarm(), settings.prewarm_interval);


let win
let data
let gameStateServer

function createMainWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        icon: path.join(__dirname, "..", "assets", "icon_512.png"),
        skipTaskbar: true,
        webPreferences: {
            nodeIntegration: false,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js")
        }
    })

    //win.setMenuBarVisibility(false)

    win.loadFile(path.join(__dirname, "window", "index.html"))

    if (isDev) {
        win.webContents.toggleDevTools()
    }
}

app.on('ready', async () => {
    data = await loadData(settings)

    createMainWindow()

    win.webContents.on('new-window', function (e, url) {
        e.preventDefault();
        require('electron').shell.openExternal(url);
    });

    globalShortcut.register(settings.hotkey_focus_toggle, () => {
        if (win.isVisible()) {
            win.hide();
        } else {
            win.show();
        }
    })

    globalShortcut.register(settings.hotkey_draft_refresh, () => {
        if (gameStateServer.gameState) {
            win.webContents.send("refreshSkills");
        }
    })
})

if (isDev) {
    require("electron-reload")(__dirname, {
        electron: path.join(process.cwd(), "node_modules", ".bin", "electron")
    })
}

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow()
    }
})

ipcMain.on('analyseDraft', async (event, screenshot) => {
    dotadraftApi.uploadScreenshot(screenshot)
        .then(filename => dotadraftApi.analyseScreenshot(filename, gameStateServer.gameState.playerTeam === "radiant"))
        .then((res) => {
            console.log(res)
            event.reply("analyseDraftResult", res)
        })
        .catch(error => {
            event.reply("analyseDraftError", error.message)
        })
})

ipcMain.on('logInfo', (event, message) => {
    log.info(message)
});

ipcMain.on('logError', (event, title, message) => {
    log.error(title, message)
});

ipcMain.on('settingsSave', (event, settings) => {
    saveSettings(settings)
    app.relaunch()
    app.exit()
});

ipcMain.on('settingsReset', (event) => {
    resetSettings()
    app.relaunch()
    app.exit()
});

ipcMain.on('settingsLoad', (event) => {
    event.returnValue = loadSettings()
});

ipcMain.on('toggleWindowPin', (event) => {
    if (win.isAlwaysOnTop()) {
        win.setAlwaysOnTop(false)
    } else {
        win.setAlwaysOnTop(true, "normal")
    }
});

ipcMain.on('loadData', (event) => {
    event.returnValue = data
});

ipcMain.on('startServer', (event) => {
    let startGame = (gameState) => {
        log.info("startGame")
        win.webContents.send('startGame', gameState);
    }

    let stopGame = (gameState) => {
        log.info("stopGame")
        win.webContents.send('stopGame');
    }

    gameStateServer = new GameStateServer(settings.dota_game_state_server_port, startGame, stopGame)
    gameStateServer.start()
});


ipcMain.on('install', async (event) => {
    const result = await dialog.showOpenDialog(win, {
        properties: ['openDirectory']
    })

    if (!result.result) {
        const dotaPath = result.filePaths[0]
        const cfgPath = path.join(dotaPath, "game", "dota", "cfg")

        if (fs.existsSync(cfgPath)) {
            const gsPath = path.join(cfgPath, "gamestate_integration")

            if (!fs.existsSync(gsPath)) {
                fs.mkdirSync(gsPath);
            }

            const srcPath = path.join(__dirname, "..", "assets", "gamestate_integration_dotadraft.cfg")
            const dstPath = path.join(gsPath, "gamestate_integration_dotadraft.cfg")

            let template = fs.readFileSync(srcPath, "utf8")
            template = template.replace("$PORT$", settings.dota_game_state_server_port)

            fs.writeFileSync(dstPath, template);

            dialog.showMessageBox({
                title: `Success`,
                message: `Delete ${dstPath} to uninstall`
            })
        } else {
            dialog.showErrorBox("Configuration error", "Cannot find dota in selected folder. Retry or install manually")
        }
    }
});


