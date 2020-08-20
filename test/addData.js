const addData = require('../resources/js/addData');
const expect = require('chai').expect;
const status = require('../resources/js/status')

describe('#namePath()', () => {

    context('non empty string', () => {
        it('should return the passed string', () => {
            expect(addData.namePath("My Path Name")).to.equal("My Path Name");
        })
    })

    context('empty string', () => {
        it('should return "first level"', () => {
            expect(addData.namePath("")).to.equal("first level");
        })
    })


})

describe('#checkCollections()', () => {

    context('Undefined collection', () => {
        it('it should return an error status with the message "No collection defined at: first level', () => {
            let checkCollectionsResult = addData.checkCollections({ "anyFieldName": "hello" }, "");
            expect(checkCollectionsResult).to.deep.equal({ status: "ERROR", content: "\"No collection defined at: first level\"" });
        })
    })

    context('No array of collection', () => {
        it('it should return an error status with the message "Collection has to be an array at first level', () => {
            let checkCollectionsResult = addData.checkCollections({ "collection": "That's not an array" }, "");
            expect(checkCollectionsResult).to.deep.equal({ status: "ERROR", content: "\"Collection has to be an array at first level\"" });
        })
    })

    context('Correct Object', () => {
        it('it should return a success status with the message "No errors"', () => {
            let checkCollectionsResult = addData.checkCollections({ "collection": [] }, "");
            expect(checkCollectionsResult).to.deep.equal({ status: "SUCCESS", content: "No errors" });
        })
    })

})

describe('#checkCollection()', () => {

    context('No collection name', () => {
        it('it should return an error status with the message "Collection has no name at first level', () => {
            let checkCollectionsResult = addData.checkCollection({ "anyFieldName": "hello" }, "");
            expect(checkCollectionsResult).to.deep.equal({ status: "ERROR", content: "\"Collection has no name at first level\"" });
        })
    })

    context('Empty collection name', () => {
        it('it should return an error status with the message "Collection has no name at first level', () => {
            let checkCollectionsResult = addData.checkCollection({ "anyFieldName": "hello" }, "");
            expect(checkCollectionsResult).to.deep.equal({ status: "ERROR", content: "\"Collection has no name at first level\"" });
        })
    })

    context('Collection name contains a / ', () => {
        it('it should return an error status with the message "A collection name must not contain a `/`, found at: first level', () => {
            let checkCollectionsResult = addData.checkCollection({ "name": "wrong/Name" }, "");
            expect(checkCollectionsResult).to.deep.equal({ status: "ERROR", content: "\"A collection name must not contain a `/`, found at: first level\"" });
        })
    })

    context('No docs provided', () => {
        it('it should return an error status with the message "The collection has no documents at: first level', () => {
            let checkCollectionsResult = addData.checkCollection({ "name": "Collection Name" }, "");
            expect(checkCollectionsResult).to.deep.equal({ status: "ERROR", content: "\"The collection has no documents at: first level\"" });
        })
    })

    context('The field docs does not contain an array', () => {
        it('it should return an error status with the message "`docs` has to be an array at first level', () => {
            let checkCollectionsResult = addData.checkCollection({ "name": "Collection Name", "docs": "not an array" }, "");
            expect(checkCollectionsResult).to.deep.equal({ status: "ERROR", content: "\"`docs` has to be an array at first level\"" });
        })
    })

    context('Correct collection', () => {
        it('it should return a success status with the message "No errors"', () => {
            let checkCollectionsResult = addData.checkCollection({ "name": "Collection Name", "docs": [] }, "");
            expect(checkCollectionsResult).to.deep.equal({ status: "SUCCESS", content: "No errors" });
        })
    })

})

describe('#checkDoc()', () => {

    context('No data field', () => {
        it('it should return an error status with the message "the document has no data at: first level', () => {
            let checkDocResult = addData.checkDoc({ "anyFieldName": "hello" }, "");
            expect(checkDocResult).to.deep.equal({ status: "ERROR", content: "\"the document has no data at: first level\"" });
        })
    })

    context('Correct Doc', () => {
        it('it should return a success status with the message "No errors"', () => {
            let checkDocResult = addData.checkDoc({ "data": "hello" }, "");
            expect(checkDocResult).to.deep.equal({ status: "SUCCESS", content: "No errors" });
        })
    })

})

describe('#createNewPath()', () => {

    context('New subcollection "subCollection" for path "main/DocName"', () => {
        it('it should return a string with "main/DocName/subCollection"', () => {

            expect(addData.createNewPath("main/DocName", "subCollection")).to.equal("main/DocName/subCollection");
        })
    })

    context('New sibling collection "sibCollection" for path "main/DocName"', () => {
        it('it should return a string with "main/DocName/sibCollection"', () => {

            expect(addData.createNewPath("main/DocName/lastCollection", "sibCollection")).to.equal("main/DocName/sibCollection");
        })
    })

    context('New main collection "main"', () => {
        it('it should return a string with "main"', () => {

            expect(addData.createNewPath("", "main")).to.equal("main");
        })
    })

})

describe('#returnStatus()', () => {

    context('Success', () => {
        it('it should an object with status SUCCESS and content No errors"', () => {

            expect(status.returnStatus("success", "No errors")).to.deep.equal({ status: "SUCCESS", content: "No errors" });
        })
    })

    context('Error', () => {
        it('it should an object with status ERROR and content some errors"', () => {

            expect(status.returnStatus("error", "No errors")).to.deep.equal({ status: "ERROR", content: "\"No errors\"" });
        })
    })

})

