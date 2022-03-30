import { } from 'mocha'
import * as chai from 'chai'  
const expect = chai.expect
import chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised)
import { correctTopLevel, oneIncorrectCollection,oneIncorrectDocument,summary } from "./fixture"
import { createNewCollectionPath, start } from "../src/service/import"
import { Firestore } from 'firebase/firestore';
import { console_, Logger, testLogger } from '../src/modules/Logger';
import * as fs from 'fs/promises';


describe('A possible TopLevel is parsed and imported', async () => {
    it('start - returns success when a correct data is passed',()=> {
        //return expect(start(correctTopLevel,"", {} as Firestore, {} as Logger)).eventually.to.be.deep.equal(create("success","temp to compile"))
        expect(start(correctTopLevel,{} as Firestore, console_)).to.be.deep.equal(summary(0,0,0))
    })

    it('A incorrect TopLevel throws',()=>{
        expect(start.bind(start,{},{} as Firestore, console_)).to.throw()
    })

    it('A TopLevel with one correct and one incorect Collection returns an Counter with one error',()=>{
        expect(start(oneIncorrectCollection,{} as Firestore, console_)).to.be.deep.equal(summary(0,0,1))
    })
    it('A collection error is logged', async ()=>{
        start(oneIncorrectCollection,{} as Firestore, testLogger)
        const loggedMsg = await fs.readFile("./test/collectionError.txt","utf8")
        expect(loggedMsg).to.include("Collection error at path { ")
    })
    it('A document error is logged', async ()=>{
        start(oneIncorrectDocument,{} as Firestore, testLogger)
        const loggedMsg = await fs.readFile("./test/documentError.txt","utf8")
        expect(loggedMsg).to.include("Document error at path { ")
    })

});

describe('Create collection paths',()=>{

    it('a collection at the top level returns the passed new segment',()=> {
        expect(createNewCollectionPath("","collName")).to.be.equal("collName")
    })

    it('a collection on the same level, removes the old one from the current path and adds the new one',()=> {
        expect(createNewCollectionPath("collName","newCollName")).to.be.equal("newCollName")
    })

    it('a subcollection is added to the current path',()=> {
        expect(createNewCollectionPath("collName/docId","newCollName")).to.be.equal("collName/docId/newCollName")
    })



});


