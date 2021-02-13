const axios = require('axios')

let log = require('./logger').getLogger()

const loadData = async (settings) => {
    log.info("loading data")

    const startTime = Date.now();

    const handleError = (e) => {
        log.error("Error loading data", e.message)
        return undefined
    }

    data = {
        stats_heroes: await axios.get(settings.url_public_bucket + "/stats_heroes.json").then(res => res.data).catch(e => handleError(e)),
        stats_skills: await axios.get(settings.url_public_bucket + "/stats_skills.json").then(res => res.data).catch(e => handleError(e)),
        data_heroes: await axios.get(settings.url_public_bucket + "/data_heroes.json").then(res => res.data).catch(e => handleError(e)),
        data_skills: await axios.get(settings.url_public_bucket + "/data_skills.json").then(res => res.data).catch(e => handleError(e)),
    }

    const now = Date.now();
    log.info(`data loaded in ${now - startTime} ms`)

    return data
}

module.exports = {loadData}