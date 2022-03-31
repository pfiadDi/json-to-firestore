import {  Firestore, DocumentReference } from 'firebase-admin/firestore'
import { Document } from '../modules/Document';
import { docError } from '../modules/Logger';


export const writeDocAdmin = async (document : Document,path:string,db:Firestore) : Promise<[string,Document]> => {
    try {
        let newDoc : DocumentReference;
        if (document.name === "") {
            newDoc = db.collection(path).doc();
        } else {
            newDoc = db.collection(path).doc(document.name);
        }
        await newDoc.set(document.data,{ merge: true })
        return [newDoc.path,document]
    }catch(error) {
        let error_ = error as Error;
        return Promise.reject(docError(document,error_.message,path))
    }
}