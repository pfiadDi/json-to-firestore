import { Firestore as FirestoreWeb } from "firebase/firestore"
import {  Firestore as FirestoreAdmin } from 'firebase-admin/firestore'
import { docError, Logger } from "../modules/Logger"
import {  checkTopLevel } from "../modules/TopLevel"
import { checkCollection, Collection } from "../modules/Collection"
import {Counter, Summary } from "../modules/Counter"
import { checkDocument, Document } from "../modules/Document"
import { writeDocWeb } from "./firestore.web"
import { writeDocAdmin } from "./firestore.admin"

type FirestoreType = "web"|"admin"

export const start = async (maybeData : unknown, db : FirestoreWeb|FirestoreAdmin, logger : Logger,firestoreType : FirestoreType) : Promise<Summary> => {
    try {
        const data = checkTopLevel(maybeData);
        return await parse(data.collection,"",db,new Counter(),logger, firestoreType)
    } catch(error) {
        return Promise.reject(error)
    }
} 

const parse = async (collections : Collection[], path : string, db : FirestoreWeb|FirestoreAdmin, counter : Counter,logger : Logger,firestoreType : FirestoreType ) : Promise<Summary> => {
    let a = 1;
    for (const collection of collections) {
        try {
            checkCollection(collection)
            path = createNewCollectionPath(path,collection.name)
            const docOperation = collection.docs.map(doc => {
                try {
                    checkDocument(doc)
                    return writeDoc(doc, path, db,firestoreType);
                } catch (error) {
                    let error_ = error as Error
                    return Promise.reject(docError(doc,error_.message,path))
                }
            })
            
            
            const docResults = await Promise.allSettled(docOperation)
            docResults.forEach(doc => {
                if(doc.status === "fulfilled") {
                    logger(`success, doc: ${doc.value}`)
                    counter.addDoc()
                } else {
                    logger(doc.reason)
                    counter.addDocError()
                }
            })
          

        } catch (error) {
            let error_ = error as Error
            logger(`Collection error at path { ${path} } (or at the same level): ${error_.message}. Failed object: ${JSON.stringify(collection)}`)
            counter.addCollectionError()
            
        }
    }

    console.log(`this is a: ${a}`)
    return counter.values
} 

export const writeDoc = async (document : Document, path : string, db : FirestoreWeb|FirestoreAdmin, firestoreType : FirestoreType) : Promise<string> => {
    if(firestoreType === "web") {
        return await writeDocWeb(document,path,db as FirestoreWeb)
    } else {
        return await writeDocAdmin(document,path,db as FirestoreAdmin)
    }
}






export const createNewCollectionPath = (currentPath : string, newSegment : string) : string => {
        if (currentPath === "") {
            return newSegment; //top level
        } else {
            let newPath = currentPath + "/" + newSegment;
            let numberOfSegments = newPath.split("/").length
            if (numberOfSegments % 2 == 0) {
                //if there are multiple collections on any level we can detect a new collection at the same level when the new path would be even. So we remove from the current path the last element and add the new instead                
                let pathSegments = currentPath.split("/");
                pathSegments.pop();
                pathSegments.push(newSegment);
                return pathSegments.join("/");
            } else {
                return currentPath + "/" + newSegment;
            }
        }
    }

