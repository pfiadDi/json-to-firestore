import {  Firestore, DocumentReference } from 'firebase-admin/firestore'
import { Document } from '../modules/Document';
import { Logger } from '../modules/Logger';


export const writeDocAdmin = async (document : Document,path:string,db:Firestore) : Promise<string> => {
    try {
        let newDoc : DocumentReference;
        if (document.name === "") {
            newDoc = db.collection(path).doc();
        } else {
            newDoc = db.collection(path).doc(document.name);
        }
        await newDoc.set(document.data,{ merge: true })
        return newDoc.path
    }catch(error) {
        let error_ = error as Error;
        return Promise.reject(error_.message)
    }
}