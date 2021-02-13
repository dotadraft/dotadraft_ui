const Store = require('electron-store');

const store = new Store();

const hotkey_focus_toggle = "hotkey_focus_toggle"
const hotkey_draft_refresh = "hotkey_draft_refresh"
const dota_window_name = "dota_window_name"
const dotadraft_api_server = "dotadraft_api_server"
const dota_game_state_server_port = "dota_game_state_server_port"
const url_public_bucket = "url_public_bucket"
const prewarm_interval = "prewarm_interval"

const defaultSettings = {
    hotkey_focus_toggle: "F6",
    hotkey_draft_refresh: "F5",
    dota_window_name: "Dota 2",
    dotadraft_api_server: "https://api.dotadraft.com",
    dota_game_state_server_port: "9990",
    url_public_bucket: "https://s3.eu-central-1.amazonaws.com/com.dotadraft.public",
    prewarm_interval: 120_000
}


const loadSettings = () => {
    return {
        hotkey_focus_toggle: store.get(hotkey_focus_toggle, defaultSettings.hotkey_focus_toggle),
        hotkey_draft_refresh: store.get(hotkey_draft_refresh, defaultSettings.hotkey_draft_refresh),
        dota_window_name: store.get(dota_window_name, defaultSettings.dota_window_name),
        dotadraft_api_server: store.get(dotadraft_api_server, defaultSettings.dotadraft_api_server),
        dota_game_state_server_port: store.get(dota_game_state_server_port, defaultSettings.dota_game_state_server_port),
        url_public_bucket: store.get(url_public_bucket, defaultSettings.url_public_bucket),
        prewarm_interval: store.get(prewarm_interval, defaultSettings.prewarm_interval)
    }
}

const saveSettings = (settings) => {
    for (const [key, s] of Object.entries(settings)) {
        store.set(key, s)
    }
}

const resetSettings = () => {
    saveSettings(defaultSettings)
}

module.exports = {loadSettings, saveSettings, resetSettings}