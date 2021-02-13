const {dialog} = require("electron")
//const simpleNodeLogger = require('simple-node-logger')

opts = {
    logFilePath: 'dotadraft.log',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
}

class ConsoleLogger {
    info(msg) {
        console.log(msg)
    }

    error(title, msg) {
        console.log(msg)
        dialog.showErrorBox(title, msg)
    }
}


const getLogger = () => {
    //return simpleNodeLogger.createSimpleLogger(opts);
    return new ConsoleLogger()
}

module.exports = {getLogger}