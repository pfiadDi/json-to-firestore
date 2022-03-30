import { array, object,Decoder, decodeValue } from "ts-json-decode"
import { components } from "../model/schema"
import { decodeCollection  } from "./Collection"


export type TopLevel = components["schemas"]["TopLevel"]

const decodeTopLevel : Decoder<TopLevel> = object({
    collection:array(decodeCollection)
})

export const checkTopLevel = (maybeTopLevel : unknown) : TopLevel => {
    try {
        return decodeValue(decodeTopLevel,maybeTopLevel);
    } catch(error) {
        throw error
    }
}