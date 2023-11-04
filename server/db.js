const { getFirestore, Timestamp, FieldValue} = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');


var admin = require("firebase-admin");
var serviceAccount = require("./firebase-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://deepfake-survey.appspot.com"
});

const db = admin.firestore();
const storage = admin.storage();

module.exports = {db,storage};