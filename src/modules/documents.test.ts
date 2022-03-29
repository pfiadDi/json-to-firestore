import { } from 'mocha'
import * as chai from 'chai'  
const expect = chai.expect
import {Decoder,object, decodeString,str, num, DecodeError, oneOf,format, nil, array, bool, union, nullable, decodeValue} from "ts-json-decode"
import { checkDocument } from "./Document"
import { checkCollection } from "./Collection"

const correctDoc : unknown = {
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

const incorrectDoc : unknown = {
    data : {}
}



describe('checks something if it is a correct Document ',()=>{

    it('Returns the same object, when all parameters are correct',()=> {
        expect(checkDocument(correctDoc)).to.be.eql(correctDoc)
    })
    it('An incorrect object throws an error',()=> {
        expect(checkDocument.bind(checkDocument,incorrectDoc)).to.throw()
    })

});