const axios = require('axios')
const FormData = require("form-data");

let log = require('./logger').getLogger()

class Dotadraft {

    constructor(server) {
        this.server = server
        this.presignedTimeout = 30000
        this.uploadTimeout = 30000
        this.analyseTimeout = 30000
    }

    async uploadScreenshot(screenshot) {
        const url = `${this.server}/upload`
        const config = {timeout: this.presignedTimeout}

        return axios.get(url, config)
            .then(res => {
                log.info(`presigned post retrieved`)

                const data = res.data
                const presigned_post = data.presigned_post
                const url = presigned_post.url
                const fields = presigned_post.fields
                const filename = data.filename

                const form = new FormData();
                Object.entries(fields).forEach(([field, value]) => {
                    form.append(field, value);
                });
                const buffer = Buffer.from(screenshot, 'binary');
                form.append("file", buffer);

                const formHeaders = form.getHeaders();
                formHeaders["Content-Length"] = form.getLengthSync()

                const config = {headers: formHeaders, timeout: this.uploadTimeout}

                return axios.post(url, form, config)
                    .then(res => {
                        log.info(`screenshot uploaded`)
                        return filename
                    })
            })
    }

    async prewarm() {
        log.info("prewarming")

        const url = `${this.server}/analyse`
        const config = {timeout: this.analyseTimeout}

        const startTime = Date.now();

        return axios.post(url, {})
            .then(res => {
                const now = Date.now();
                log.info(`prewarmed in ${now - startTime} ms`)
                return res.data
            }).catch(error => {
                const now = Date.now();
                log.info(`prewarmed in ${now - startTime} ms`)
            })
    }

    async analyseScreenshot(filename, teamRadiant) {
        const url = `${this.server}/analyse`
        const data = {filename: filename, team_radiant: teamRadiant}
        const config = {timeout: this.analyseTimeout}

        return axios.post(url, data, config)
            .then(res => {
                log.info(`screenshot analysed`)
                return res.data
            })
    }
}

module.exports = {Dotadraft}