import { components } from "../model/schema"

export type Summary = components["schemas"]["Summary"]

export class Counter {
    docs = 0
    docErrors = 0
    collectionErrors = 0

    public addDoc() {
        this.docs++;
        return this;
    }
    public addDocError() {
        this.docErrors++;
        return this;
    }
    public addCollectionError() {
        this.collectionErrors++;
        return this;
    }

    public get values() : Summary {
        return {
            docs : this.docs,
            docErrors : this.docErrors,
            collectionErrors : this.collectionErrors
        }
    }
    
}
