const checkConfig = require('../resources/js/config').checkConfig;
const expect = require('chai').expect;
const status = require('../resources/js/status')



describe('#checkConfig()', () => {

    context('Undefined config', () => {
        it('it should return an error status with the message "No config file provided', () => {
            let result = checkConfig();
            expect(result).to.deep.equal({ status: "ERROR", content: "\"No config file provided\"" });
        })
    })

    context('No API key', () => {
        it('it should return an error status with the message "Config file: no valid API key"', () => {
            let result = checkConfig({ "someFieldName": "hallo" });
            expect(result).to.deep.equal({ status: "ERROR", content: "\"Config file: no valid API key\"" });
        })
    })

    context('Empty API key', () => {
        it('it should return an error status with the message "Config file: no valid API key"', () => {
            let result = checkConfig({ "apiKey": "" });
            expect(result).to.deep.equal({ status: "ERROR", content: "\"Config file: no valid API key\"" });
        })
    })

    context('No database URL', () => {
        it('it should return an error status with the message "Config file: no valid databaseUrl"', () => {
            let result = checkConfig({ "apiKey": "hallo" });
            expect(result).to.deep.equal({ status: "ERROR", content: "\"Config file: no valid databaseUrl\"" });
        })
    })

    context('Empty database URL', () => {
        it('it should return an error status with the message "Config file: no valid databaseUrl"', () => {
            let result = checkConfig({ "apiKey": "hallo", "databaseURL": "" });
            expect(result).to.deep.equal({ status: "ERROR", content: "\"Config file: no valid databaseUrl\"" });
        })
    })

    context('No projectID', () => {
        it('it should return an error status with the message "Config file: no valid projectId"', () => {
            let result = checkConfig({ "apiKey": "hallo", "databaseURL": "asdf" });
            expect(result).to.deep.equal({ status: "ERROR", content: "\"Config file: no valid projectId\"" });
        })
    })

    context('Empty projectID', () => {
        it('it should return an error status with the message "Config file: no valid projectId"', () => {
            let result = checkConfig({ "apiKey": "hallo", "databaseURL": "asdf", "projectId": "" });
            expect(result).to.deep.equal({ status: "ERROR", content: "\"Config file: no valid projectId\"" });
        })
    })

    context('No appId', () => {
        it('it should return an error status with the message "Config file: no valid appId"', () => {
            let result = checkConfig({ "apiKey": "hallo", "databaseURL": "asdf", "projectId": "asdf" });
            expect(result).to.deep.equal({ status: "ERROR", content: "\"Config file: no valid appId\"" });
        })
    })

    context('Empty appId', () => {
        it('it should return an error status with the message "Config file: no valid appId"', () => {
            let result = checkConfig({ "apiKey": "hallo", "databaseURL": "asdf", "projectId": "asdf", "appId": "" });
            expect(result).to.deep.equal({ status: "ERROR", content: "\"Config file: no valid appId\"" });
        })
    })

    context('Correct config', () => {
        it('it should return a success status with the message "No Error"', () => {
            let result = checkConfig({ "apiKey": "hallo", "databaseURL": "asdf", "projectId": "asdf", "appId": "asdf" });
            expect(result).to.deep.equal({ status: "SUCCESS", content: "No errors" });
        })
    })


})



