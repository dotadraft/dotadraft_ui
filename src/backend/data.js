const {app} = require("electron")
const axios = require('axios')

let log = require('./logger').getLogger()

const loadData = async (settings) => {
    log.info("loading data")

    const startTime = Date.now();

    const data = {}

    const loading = Promise.all([
        axios.get(settings.url_public_bucket + "/stats_heroes.json").then(res => data.stats_heroes = res.data),
        axios.get(settings.url_public_bucket + "/stats_skills.json").then(res => data.stats_skills = res.data),
        axios.get(settings.url_public_bucket + "/data_heroes.json").then(res => data.data_heroes = res.data),
        axios.get(settings.url_public_bucket + "/data_skills.json").then(res => data.data_skills = res.data),
        axios.get("https://api.github.com/repos/dotadraft/dotadraft_ui/releases/latest").then(res => data.latest_version = res.data.tag_name)
    ]).then(() => {
        data.current_version = app.getVersion()
    }).catch(e => {
        log.error("Error loading data", "Check internet connection")
        app.quit()
    })

    await loading

    const now = Date.now();
    log.info(`data loaded in ${now - startTime} ms`)

    return data
}

module.exports = {loadData}