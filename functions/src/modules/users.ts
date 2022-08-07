import * as functions from 'firebase-functions';
import * as cors from 'cors';
import * as admin from 'firebase-admin';

const corsHandler = cors({ origin: true });

exports.updateUserProfile = functions.https.onRequest(
  async (req: any, res: any) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    corsHandler(req, res, async () => {
      const userID = req.query.userID;
      try {
        const db = admin.firestore();
        var docRef = db.collection('client-data').doc(userID);
        docRef.set(req.body, { merge: true });
        res.send(docRef);
      } catch (err) {
        res.send(JSON.stringify('This is a mess' + err));
      }
    });
  }
);

exports.addAgent = functions.https.onRequest(async (req: any, res: any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  corsHandler(req, res, async () => {
    admin
      .auth()
      .createUser({
        // Start with...
        // email: "user@example.com",
        // emailVerified: false,
        // phoneNumber: "+11234567890",
        // password: "secretPassword",
        // displayName: "John Doe",
        // photoURL: "http://www.example.com/12345678/photo.png",
        // disabled: false

        // Aim for....
        // phoneNumber: req.body.contactNumber,
        // password: req.body.password,
        // displayName: req.body.firstName + ' ' + req.body.lastName,
        // photoURL: '',
        // disabled: false,
        email: req.body.email,
        emailVerified: false,
        phoneNumber: '+11234567890',
        password: req.body.password,
        displayName: 'John Doe',
        photoURL: 'http://www.example.com/12345678/photo.png',
        disabled: false,
      })
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        res.send(userRecord);
      })
      .catch((error) => {
        res.send(error);
      });
  });
});
