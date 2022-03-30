import { FirebaseApp } from "firebase/app";
import {  Firestore, collection, doc, setDoc} from "firebase/firestore"

export const writeDocWeb = async (data:object,docName:string,path:string,db:Firestore) : Promise<string> => {
    try {
        const docRef = (docName === "") ? doc(collection(db,path)) : doc(db,`${path}/${docName}`)
        await setDoc(docRef,data,{merge:true})
        return docRef.path
    }catch(error) {
        throw error
    }
}