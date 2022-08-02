const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
admin.initializeApp(functions.config().firebase);

// How to write functions accross multiple files:
// https://firebase.google.com/docs/functions/organize-functions#write_functions_in_multiple_files

/*
addLead (POST only)
url: https://us-central1-assembl-ez.cloudfunctions.net/addLead
params: userID 
*/
exports.addLead = functions.https.onRequest(async (req: any, res: any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  cors(req, res, async () => {
    const userID = req.query.userID;
    const docRefID = generateDateBaseDocRefID();
    try {
      const db = admin.firestore();
      var docRef = db
        .collection('client-data')
        .doc(userID)
        .collection('leads')
        .doc(docRefID);
      docRef.set(req.body, { merge: true });
    } catch (err) {
      res.send(JSON.stringify('This is a mess' + err));
    }
    res.send(docRef);
  });
});

function generateDateBaseDocRefID() {
  const randomElement = Math.floor(Math.random() * 100);
  const date = new Date();
  const docRefID =
    date.getFullYear().toString().padStart(4, '0') +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    date.getDate().toString().padStart(2, '0') +
    date.getHours().toString().padStart(2, '0') +
    date.getMinutes().toString().padStart(2, '0') +
    date.getSeconds().toString().padStart(2, '0') +
    date.getMilliseconds().toString().padStart(4, '0') +
    randomElement.toString().padStart(2, '0');

  return docRefID;
}
