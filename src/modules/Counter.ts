import { components } from "../model/schema"

export type Summary = components["schemas"]["Summary"]

export class Counter {
    docs = 0
    docErrors = 0
    collectionErrors = 0

    public addDoc() {
        this.docs++;
    }
    public addDocError() {
        this.docErrors++;
    }
    public addCollectionError() {
        this.collectionErrors++;
    }

    public get values() : Summary {
        return {
            docs : this.docs,
            docErrors : this.docErrors,
            collectionErrors : this.collectionErrors
        }
    }
    
}
