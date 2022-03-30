import { } from 'mocha'
import * as chai from 'chai'  
const expect = chai.expect
import { checkDocument } from "../src/modules/Document"
import { correctDoc } from "./fixture"




describe('checks something if it is a correct Document ',()=>{

    it('Returns the same object, when all parameters are correct',()=> {
        expect(checkDocument(correctDoc)).to.be.eql(correctDoc)
    })
    it('An incorrect object throws an error',()=> {
        expect(checkDocument.bind(checkDocument,{f1 : "something"})).to.throw()
    })

});