import { FirebaseApp } from "firebase/app";
import {  Firestore, collection, doc, setDoc} from "firebase/firestore"
import { Logger } from "../modules/Logger";

export const writeDocWeb = async (data:object,docName:string,path:string,db:Firestore,logger : Logger) : Promise<string> => {
    try {
        const docRef = (docName === "") ? doc(collection(db,path)) : doc(db,`${path}/${docName}`)
        await setDoc(docRef,data,{merge:true})
        logger(docRef.path)
        return docRef.path
    }catch(error) {
        throw error
    }
}