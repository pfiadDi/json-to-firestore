import { FirebaseApp } from "firebase/app";
import {  Firestore, collection, doc, setDoc} from "firebase/firestore"
import { Document } from "../modules/Document";
import { Logger } from "../modules/Logger";

export const writeDocWeb = async (document : Document,path:string,db:Firestore) : Promise<string> => {
    try {
        const docRef = (document.name === "") ? doc(collection(db,path)) : doc(db,`${path}/${document.name}`)
        await setDoc(docRef,document.data,{merge:true})
        return docRef.path
    }catch(error) {
        throw error
    }
}