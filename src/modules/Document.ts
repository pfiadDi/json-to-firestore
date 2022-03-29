import {Decoder,object, decodeValue,str, num, DecodeError, oneOf,format, nil, array, bool, union, nullable, decodeString, maybe} from "ts-json-decode"

import { components } from "../model/schema"
import { decodeCollection,Collection } from "./Collection"

export type Document = components["schemas"]["Document"]



const decodeData: Decoder<any> = value => {
    if(typeof value === "object") return value;
    throw new DecodeError("Expected an object","got anything else")
}

export const decodeDocument : Decoder<Document> = object({
    name:str,
    data:decodeData,
    collection:oneOf(array(decodeCollection),nil)
})

export const checkDocument = (maybeDocument : unknown) : Document => {
    try {
        return decodeValue(decodeDocument)(maybeDocument)
    } catch (error) {
        throw error
    }
}