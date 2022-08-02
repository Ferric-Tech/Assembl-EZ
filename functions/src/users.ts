exports.updateUserProfile = functions.https.onRequest(
  async (req: any, res: any) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    cors(req, res, async () => {
      const userID = req.query.userID;
      try {
        const db = admin.firestore();
        var docRef = db.collection('client-profiles').doc(userID);
        docRef.set(req.body, { merge: true });
      } catch (err) {
        res.send(JSON.stringify('This is a mess' + err));
      }
      res.send(docRef);
    });
  }
);
