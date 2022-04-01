import * as fs from "fs"

export type Logger = {
    /** @description A callback function that takes the status msg, and propably does something with it like logging it to the console */
    (msg : string ) : void
}

export const console_ : Logger = (msg : string) => {
    console.log(msg)
}

export const testLogger : Logger = (msg : string) => {
    /** @description only for tests. this function logs it to a test file */
    let fileName = "success.txt";
    if (msg.includes("Collection error")) fileName = "collectionError.txt"
    if (msg.includes("Document error")) fileName = "documentError.txt"
    fs.writeFile(`./test/${fileName}`,msg,()=> {

    })
}

export const docError = (document : any, errorMsg : string, path : string) : string => {
    return `Document error at path - ${path} -, passed data: - ${JSON.stringify(document)}. That happend: ${errorMsg}`
}
export const collectionError = (collection : any, errorMsg : string, path : string) : string => {
    return `Collection error at or near path - ${path} -, passed data: - ${JSON.stringify(collection)}. That happend: ${errorMsg}`
}