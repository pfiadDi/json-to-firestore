const status = require("./status");
const logger = require("./log");

module.exports = {
    namePath: (path) => {
        if (path === "") {
            return "first level"
        } else {
            return path;
        }
    },
    checkCollections: (collections, currentPath) => {
        if (collections === undefined) return status.returnStatus("error", "No data provided");

        if (collections.collection === undefined) return status.returnStatus("error", "No collection defined at: " + module.exports.namePath(currentPath));

        if (!Array.isArray(collections.collection)) return status.returnStatus("error", "Collection has to be an array at " + module.exports.namePath(currentPath));

        return status.returnStatus("success", "No errors");
    },
    checkCollection: (collection, currentPath) => {
        if (collection.name === "" || collection.name === undefined) return status.returnStatus("error", "Collection has no name at " + module.exports.namePath(currentPath));

        if (collection.name.includes('/')) return status.returnStatus("error", "A collection name must not contain a `/`, found at: " + module.exports.namePath(currentPath));

        if (collection.docs === undefined) return status.returnStatus("error", "The collection has no documents at: " + module.exports.namePath(currentPath));

        if (!Array.isArray(collection.docs)) return status.returnStatus("error", "`docs` has to be an array at " + module.exports.namePath(currentPath));

        return status.returnStatus("success", "No errors");
    },
    checkDoc: (doc, currentPath) => {
        if (doc.data === undefined) return status.returnStatus("error", "the document has no data at: " + module.exports.namePath(currentPath));
        return status.returnStatus("success", "No errors");
    },
    createNewPath: (currentPath, newSegment) => {
        if (currentPath === "") {
            return newSegment;
        } else {
            let newPath = currentPath + "/" + newSegment;
            let numberOfSegments = newPath.split("/").length
            if (numberOfSegments % 2 == 0) {
                //if there are multiple collections on any level we can detect a new collection at the same level when the new path would be even. So we remove from the current path the last element and add the new instead                
                pathSegments = currentPath.split("/");
                pathSegments.pop();
                pathSegments.push(newSegment);
                return pathSegments.join("/");
            } else {
                return currentPath + "/" + newSegment;
            }

        }
    },
    parseCollection: async (collections, currentPath, db) => {
        collections.forEach(currentCollection => {
            let checkCollection = module.exports.checkCollection(currentCollection, currentPath);
            if (checkCollection.status === "ERROR") return logger.send(checkCollection);
            currentPath = module.exports.createNewPath(currentPath, currentCollection.name);
            currentCollection.docs.forEach(async currentDoc => {
                let checkDoc = module.exports.checkDoc(currentDoc, currentPath);
                if (checkDoc.status === "ERROR") return logger.send(checkDoc);
                let writeResult = await module.exports.writeDoc(currentDoc.data, currentDoc.name, currentPath, db);
                if (writeResult.status === "ERROR") return logger.send(writeResult);
                logger.send(writeResult); //log success
                if (currentDoc.collection === undefined) return writeResult.content;
                let checkCollections = module.exports.checkCollections(currentDoc, writeResult.content);
                if (checkCollections.status === "ERROR") return logger.send(checkCollections);
                module.exports.parseCollection(currentDoc.collection, writeResult.content, db)
            });

        });
    },
    writeDoc: (data, docName, path, db) => {
        return new Promise((resolve, reject) => {
            let newDoc;
            if (docName === "" || docName === undefined) {
                newDoc = db.collection(path).doc();
            } else {
                newDoc = db.collection(path).doc(docName);
            }

            newDoc.set(data,{ merge: true }).then(() => {
                return resolve(status.returnStatus("success", path + "/" + newDoc.id));
            }).catch(err => {
                return resolve(status.returnStatus("error", err));
            });
        });
    }


}