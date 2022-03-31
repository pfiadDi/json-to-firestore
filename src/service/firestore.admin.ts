import {  Firestore, DocumentReference } from 'firebase-admin/firestore'
import { Logger } from '../modules/Logger';


export const writeDocAdmin = async (data:object,docName:string,path:string,db:Firestore,logger : Logger) : Promise<string> => {
    try {
        let newDoc : DocumentReference;
        if (docName === "") {
            newDoc = db.collection(path).doc();
        } else {
            newDoc = db.collection(path).doc(docName);
        }
        await newDoc.set(data,{ merge: true })
        return newDoc.path
    }catch(error) {
        throw error
    }
}