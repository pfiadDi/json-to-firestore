import "babel-polyfill";
import firebase from "firebase/app";
import "firebase/firestore";

const addData = require("./resources/js/addData");
const logger = require("./resources/js/log");
const checkConfig = require("./resources/js/config").checkConfig

let dataJson;
let configJson;

document.getElementById("data").addEventListener("change", function () {
    let fr = new FileReader();
    fr.onload = (e) => {
        dataJson = JSON.parse(e.target.result);
    }
    fr.readAsText(this.files[0]);

}, false);

document.getElementById("config").addEventListener("change", function () {
    let fr = new FileReader();
    fr.onload = (e) => {
        configJson = JSON.parse(e.target.result);
    }
    fr.readAsText(this.files[0]);
}, false);

document.getElementById("add").addEventListener("click", () => {
    let checkConfigResult = checkConfig(configJson);
    if (checkConfigResult.status === "ERROR") return logger.send(checkConfigResult);

    firebase.initializeApp(configJson);
    const db = firebase.firestore();
    if (window.location.hostname === "localhost" && document.getElementById("local").checked) {
        db.settings({
            host: "localhost:8080",
            ssl: false
        });
    }
    let checkCollections = addData.checkCollections(dataJson, "");
    if (checkCollections.status === "ERROR") return logger.send(checkCollections);

    addData.parseCollection(dataJson.collection, "", db);
});

