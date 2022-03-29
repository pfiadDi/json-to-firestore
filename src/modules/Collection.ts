import {Decoder,object, decodeValue,str, num, DecodeError, oneOf,format, nil, array, bool, union} from "ts-json-decode"
import { components } from "../model/schema"

export type Collection = components["schemas"]["Collection"]

const decodeDocs: Decoder<any> = value => {
    if(typeof value === "object") return value;
    throw new DecodeError("Expected an object","got anything else")
}
export const decodeCollection : Decoder<Collection> = object({
    name:str,
    docs:array(decodeDocs) //only check for the presence of an array of objects to avoid recursive hell. if a doc is valid is checked when a doc is checked
})


export const checkCollection = (maybeDocument : unknown) : Collection => {
    try {
        return decodeValue(decodeCollection)(maybeDocument)
    } catch (error) {
        throw error
    }
}