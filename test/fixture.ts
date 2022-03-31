import { resolve } from "path"
import { Summary } from "../src/modules/Counter"

export const docNoName : unknown = {
    name: "",
    data: {
        companyName: "Large Corp",
        startDate: "2020-08-21",
        endDate: "2020-08-31"
    },
    collection: [
        {
            name: "invoices",
            docs: [
                {
                    name: "",
                    data: {
                        "amount": 1000,
                        "product": "Productname"
                    },
                    collection: null
                },
            ]
        }
         ]
    }

export const correctDocThrow : unknown = {
name: "throw",
data: {
    companyName: "Large Corp",
    startDate: "2020-08-21",
    endDate: "2020-08-31"
},
collection: [
    {
        name: "invoices",
        docs: [
            {
                name: "",
                data: {
                    "amount": 1000,
                    "product": "Productname"
                },
                collection: null
            },
        ]
    }
        ]
}
export const correctDocName : unknown = {
    name: "aname",
    data: {
        companyName: "Large Corp",
        startDate: "2020-08-21",
        endDate: "2020-08-31"
    },
    collection: [
        {
            name: "invoices",
            docs: [
                {
                    name: "",
                    data: {
                        "amount": 1000,
                        "product": "Productname"
                    },
                    collection: null
                },
            ]
        }
         ]
    }
export const incorrectDoc : unknown = {
    name: "",
    }

export const correctTopLevel : unknown = {
    // results in two document writes, one unsuccessfully write
    collection: [
        {
            name: "invoices",
            docs: [
                correctDocName
            
            ]
        },
        {
            name: "secondCollection",
            docs: [
                correctDocThrow
                , docNoName
            ]
        }
    ]
}
export const oneIncorrectDocument : unknown = {
    collection: [
        {
            name: "invoices",
            docs: [
                docNoName
                , incorrectDoc
            ]
        }
    ]
}
export const oneIncorrectCollection : unknown = {
    collection: [
                {
            name: "second/Collection",
            docs: [
                docNoName
                , docNoName
            ]
        },
        {
            name: "invoices",
            docs: [
                docNoName
                , docNoName
            ]
        }

    ]
}

export const summary = (s : number,de : number,ce : number) : Summary => {
    return {
        docErrors : de,
        docs : s,
        collectionErrors : ce
    }
}

export class FirestoreMock {
    path = ""

    collection(path:string) {
        this.path = path
        return this;
    }

    doc(docId : string) {
        if(docId === undefined) docId = "randString"
        if(docId === "throw") throw new Error('A database error occured')
        this.path = this.path+docId
        return this;
    }

    set(data:object,options:object) {
        return new Promise((resolve,reject)=>{
            console.log("resolved")
            resolve(this)
        })
    }
  
}


