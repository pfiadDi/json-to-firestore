# JSON to Firestore

This library helps you uploading a complex JSON structure to your Firebase Firestore. And it automatically creates all necessary collections, documents, and subcollection. This way, you can easily add data to new projects, transfer data, or spin up your local emulator and add initial data. You only have to provide the JSON, not an additional schema or so.

## Functions

- Interface
- Automatically identifies collections and subcollections
- Choose if you upload the data to your emulated Firestore or the real online version
- A protocol of which parts were successfully processed and which failed
- Automatically identification, whether a document should have a provided name or a randomly generated one


## JSON Structure 

The JSON represents your database structure and is nested in the same way. Documents and collections are defined like:

Document:

```type Document = 
  {
   "name" : <String>,
   "data" : <JSON>,
   "collection" : <optional Array Collection>
  }
  ```

A document has a field `name` which is a string that can be empty. If `name` is an empty string (`""`), Firebase generates a random one as usually. If it's a non-empty string, we use this string as the document name. A document requires a field called `data`. With the JSON, nested in the data field, you provide the content of the document. The optional field `collection` - when defined - needs to be an array of type `Collection` (see below). In this case, subcollections would be added to the new document.

Collection: 

```type Collection = 
  {
   "name" : <Non empty String>,
   "docs" : <Array of Document>
  }
  ```

A collection needs a field `name`, which has to be a non-empty string field called `docs` which contains an array of documents.
  
#### Examples

Document:
```
  {
   "name" : "",
   "data" : {
      "userName" : "Mike Meyers",
      "email" : "mike@mail.com"
     }
   "collection" : [
            { "name" : "orders",
              "docs" : [..]
            },
            { "name" : "favourites",
              "docs" : [..]
            }
        ]
  }
  ```
  
Collection:
```
  {
   "name" : "users",
   "docs" : [{
      "userName" : "Mike Meyers",
      "email" : "mike@mail.com",
      "collection" : []
     },
     {
      "userName" : "Andrea Bellastro",
      "email" : "andrea@mail.com",
      "collection" : []
     }
     ]
  }
  ```

The provided JSON needs to start with an array of collection, nested in a field called `collection`:

```
  {
   "collection" : [
       { 
         "name" : "users",
         "docs" : []
       }       
     ]
   }
```

Config JSON:
The config object from the console has to provided as JSON too.

Gotcha: Don't forget you have to provide a JSON, not a JS object, and therefore use `""` for key names.

## Usage

After you cloned the repo to your local computer, run `npm install`. To start the interface run `npm run serve`, this will serve the program at `localhost:1234`. When port `1234` is in use, a different one will be assigned - take a look at the console output to see which port is used.
Open the interface and use the upload buttons to upload the Firebase API configuration object and the data JSON.
You can choose `Use emulated Firestore` to upload the data to the emulator. Don't forget if you want to use the emulator, you have to start it beforehand with `firebase emulators:start`. Run this command in the project folder of your Firebase project, not in this program's folder. 

## Examples
Check out a full data JSON and config JSON in `/examples`

## Limitations

You can't have any security rules in place. It would be easily possible to use authentication but that wouldn't solve the problem fully. Since most security rules are way more detailed and often with a completly different scope then adding initial data. So for the upload you have to open your database. 

## Roadmap 

- Possibility to use `FieldValue.serverTimestamp()`
- Program as Cloud function that security rules can be bypassed and not have to be deactivated for the upload 
- Nicer UI layout ;-) 
