const {desktopCapturer, ipcRenderer, contextBridge} = require("electron")

contextBridge.exposeInMainWorld("logger", {
    info(msg) {
        console.log(`INFO:  ${msg}`)
        ipcRenderer.send("logInfo", msg)
    },
    error(title, msg) {
        console.log(`ERROR:  ${msg}`)
        ipcRenderer.send("logError", title, msg)
    }
})

contextBridge.exposeInMainWorld("settingsApi", {
    save(settings) {
        ipcRenderer.sendSync("settingsSave", settings)
    },
    reset() {
        ipcRenderer.sendSync("settingsReset")
    },
    load() {
        return ipcRenderer.sendSync("settingsLoad")
    },
    install() {
        return ipcRenderer.send("install")
    }
})

contextBridge.exposeInMainWorld("dataApi", {
    load() {
        return ipcRenderer.sendSync("loadData")
    }
})

contextBridge.exposeInMainWorld("gameStateApi", {
    startServer() {
        return ipcRenderer.send("startServer")
    }
})

contextBridge.exposeInMainWorld("windowApi", {
    togglePin() {
        ipcRenderer.send("toggleWindowPin")
    }
})

contextBridge.exposeInMainWorld("dotadraftApi", {
    analyseDraft(windowName) {
        return desktopCapturer.getSources({
            types: ['window']
        }).then(inputSources => {
            inputSources.forEach(e => console.log(e.name))
            const source = inputSources.find(e => e.name === windowName)

            if (source) {
                const constraints = {
                    audio: false,
                    video: {
                        mandatory: {
                            chromeMediaSource: 'desktop',
                            chromeMediaSourceId: source.id,
                            maxWidth: 4096,
                            maxHeight: 2160
                        }
                    }
                }
                return navigator.mediaDevices.getUserMedia(constraints)
            } else {
                throw `window with name ${windowName} not found`
            }
        }).then(stream => {
            const track = stream.getVideoTracks()[0]
            const imageCapture = new ImageCapture(track)
            return imageCapture.grabFrame().finally(() => {
                track.stop()
            })
        }).then(imageBitmap => {
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')
            canvas.width = imageBitmap.width
            canvas.height = imageBitmap.height
            context.drawImage(imageBitmap, 0, 0, imageBitmap.width, imageBitmap.height)

            return new Promise((resolve, reject) => {
                canvas.toBlob(blob => {
                    resolve(blob)
                })
            })
        }).then(blob => {
            return blob.arrayBuffer()
        }).then(arraybuffer => {
            ipcRenderer.send("analyseDraft", arraybuffer)
        })
    },
    registerCallbackResult(callback) {
        ipcRenderer.on("analyseDraftResult", function (event, obj) {
            callback(obj)
        })
    },
    registerCallbackError(callback) {
        ipcRenderer.on("analyseDraftError", function (event, obj) {
            callback(obj)
        })
    },
    registerCallbackStartGame(callback) {
        ipcRenderer.on("startGame", function (event, gameState) {
            callback(gameState)
        })
    },
    registerCallbackStopGame(callback) {
        ipcRenderer.on("stopGame", function (event) {
            callback()
        })
    },
    registerCallbackRefreshSkills(callback) {
        ipcRenderer.on("refreshSkills", function (event) {
            callback()
        })
    }
})