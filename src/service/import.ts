import { Firestore as FirestoreWeb } from "firebase/firestore"
import {  Firestore as FirestoreAdmin } from 'firebase-admin/firestore'
import { Logger } from "../modules/Logger"
import {  checkTopLevel } from "../modules/TopLevel"
import { checkCollection, Collection } from "../modules/Collection"
import {Counter, Summary } from "../modules/Counter"
import { checkDocument } from "../modules/Document"
import { writeDocWeb } from "./firestore.web"
import { writeDocAdmin } from "./firestore.admin"

type FirestoreType = "web"|"admin"

export const start = async (maybeData : unknown, db : FirestoreWeb|FirestoreAdmin, logger : Logger,firestoreType : FirestoreType) : Promise<Summary> => {
    try {
        const data = checkTopLevel(maybeData);
        return await parse(data.collection,"",db,new Counter(),logger, firestoreType)
    } catch(error) {
        throw error
    }
} 

const parse = async (collections : Collection[], path : string, db : FirestoreWeb|FirestoreAdmin, counter : Counter,logger : Logger,firestoreType : FirestoreType ) : Promise<Summary> => {
    collections.forEach(collection => {
        try {
            checkCollection(collection)
            path = createNewCollectionPath(path,collection.name)
            
            const docOperation = collection.docs.map(doc => {
                
            })
            //parse docs of collection
            collection.docs.forEach(async doc => {
                try {
                    checkDocument(doc)
                    let pathNewDoc = await writeDoc(doc.data, doc.name, path, db,firestoreType,logger);
                    

                } catch (error) {
                    let error_ = error as Error
                    logger(`Document error at path { ${path} }: ${error_.message}. Failed object: ${JSON.stringify(doc)}`)
                }
            })

        } catch (error) {
            let error_ = error as Error
            logger(`Collection error at path { ${path} } (or at the same level): ${error_.message}. Failed object: ${JSON.stringify(collection)}`)
            counter.collectionErrors = counter.collectionErrors+1
        }
    })
    return counter.values
} 

export const writeDoc = async (data : object, docName : string, path : string, db : FirestoreWeb|FirestoreAdmin, firestoreType : FirestoreType, logger : Logger) : Promise<string> => {
    if(firestoreType === "web") {
        return await writeDocWeb(data,docName,path,db as FirestoreWeb,logger)
    } else {
        return await writeDocAdmin(data,docName,path,db as FirestoreAdmin,logger)
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