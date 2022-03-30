import { } from 'mocha'
import * as chai from 'chai'  
const expect = chai.expect
import { checkTopLevel } from '../src/modules/TopLevel'
import { correctTopLevel } from "./fixture"




describe('checks something if it is a correct TopLevel ',()=>{

    it('Returns the same object, when all parameters are correct',()=> {
        expect(checkTopLevel(correctTopLevel)).to.be.eql(correctTopLevel)
    })
    it('An incorrect object throws an error',()=> {
        expect(checkTopLevel.bind(checkTopLevel,"lsl")).to.throw()
    })

});