import {Decoder,object, decodeValue,str,  DecodeError,  array, } from "ts-json-decode"
import { components } from "../model/schema"

export type Collection = components["schemas"]["Collection"]

const decodeDocs: Decoder<any> = value => {
    if(typeof value === "object") return value;
    throw new DecodeError("Expected an object","got anything else")
}
export const decodeCollection : Decoder<Collection> = object({
    name:str,
    docs:array(decodeDocs) //only check for the presence of an array of objects to avoid recursive hell. if a doc is valid is checked in the next step
})


export const checkCollection = (maybeCollection : unknown) : Collection => {
    try {
        const collection = decodeValue(decodeCollection)(maybeCollection);
        if (collection.name.includes('/')) throw new Error('A collection name must not contain a `/`');
        return collection;
    } catch (error) {
        throw error
    }
}