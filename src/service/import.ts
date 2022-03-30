import { Firestore } from "firebase/firestore"
import { Logger } from "../modules/Logger"
import {  checkTopLevel } from "../modules/TopLevel"
import { checkCollection, Collection } from "../modules/Collection"
import {Counter, Summary } from "../modules/Counter"
import { checkDocument } from "../modules/Document"
import { writeDocWeb } from "./firestore.web"


export const start =  (maybeData : unknown, db : Firestore, logger : Logger) : Summary => {
    try {
        const data = checkTopLevel(maybeData);
        return parse(data.collection,"",{} as Firestore,new Counter(),logger)
    } catch(error) {
        throw error
    }
} 

const parse = (collections : Collection[], path : string, db : Firestore, counter : Counter,logger : Logger) : Summary => {
    collections.forEach(collection => {
        try {
            checkCollection(collection)
            path = createNewCollectionPath(path,collection.name)
            
            //parse docs of collection
            collection.docs.forEach(doc => {
                try {
                    checkDocument(doc)
                    
                    let pathNewDoc = writeDoc(doc.data, doc.name, path, db);


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

export const writeDoc = async (data : object, docName : string, path : string, db : Firestore, firestoreType : "web"|"admin") : Promise<string> => {
    if(firestoreType === "web") {
        return await writeDocWeb(data,docName,path,db)
    } else {
        return await writeDocAdmin()
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