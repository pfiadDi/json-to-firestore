import { Counter } from "../src/modules/Counter";
import { } from 'mocha'
import * as chai from 'chai'  
const expect = chai.expect

describe('A counter holds values and returns a Counter',()=>{
    it('A new counter',()=> {
        const c = new Counter()
        c.addDoc()
        c.addDocError()
        c.addDoc()
        c.addCollectionError()
        expect(c.values).to.be.deep.equal({
            docs:2,
            docErrors:1,
            collectionErrors:1
        })
    })
});