
const admin = require('firebase-admin');

admin.initializeApp();

// var serviceAccount = require("path/to/serviceAccountKey.json");
 
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://your-app.firebaseio.com"
// });


export const db = admin.firestore();