const status = require("./status");

module.exports = {

    checkConfig: (config) => {
        if (config === undefined) return status.returnStatus("error", "No config file provided");

        if (config.apiKey === undefined || config.apiKey === "") return status.returnStatus("error", "Config file: no valid API key");

        if (config.projectId === undefined || config.projectId === "") return status.returnStatus("error", "Config file: no valid projectId");

        if (config.appId === undefined || config.appId === "") return status.returnStatus("error", "Config file: no valid appId");

        return status.returnStatus("success", "No errors");

    }
}