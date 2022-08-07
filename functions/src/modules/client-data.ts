import * as functions from 'firebase-functions';
import * as cors from 'cors';
import * as admin from 'firebase-admin';

const corsHandler = cors({ origin: true });

exports.getClientData = functions.https.onRequest(
  async (req: any, res: any) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    corsHandler(req, res, async () => {
      const userID = req.query.userID;
      try {
        // Referance data base
        const db = admin.firestore();

        //Get client data
        const profileDocDocRef = db.collection('client-data').doc(userID);
        const profileDoc = await profileDocDocRef.get();
        const profile = profileDoc.data();

        //Get client leads
        let leads: { [key: string]: any } = {};
        const leadsDocRef = db
          .collection('client-data')
          .doc(userID)
          .collection('leads');
        await leadsDocRef.get().then((snapshot) => {
          snapshot.forEach((doc) => {
            leads[doc.id] = doc.data();
          });
        });
        res.send({ profile, leads });
      } catch (error) {
        res.send(error);
      }
    });
  }
);
