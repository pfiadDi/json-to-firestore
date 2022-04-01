import {  Firestore, collection, doc, setDoc} from "firebase/firestore"
import { Document } from "../modules/Document";
import { docError } from "../modules/Logger";

export const writeDocWeb = async (document : Document,path:string,db:Firestore) : Promise<[string,Document]> => {
    try {
        const docRef = (document.name === "") ? doc(collection(db,path)) : doc(db,`${path}/${document.name}`)
        await setDoc(docRef,document.data,{merge:true})
        return [docRef.path,document]
    }catch(error) {
        let error_ = error as Error;
        return Promise.reject(docError(document,error_.message,path))
    }
}