// How to write functions accross multiple files:
// https://firebase.google.com/docs/functions/organize-functions#write_functions_in_multiple_files

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
admin.initializeApp(functions.config().firebase);

const leads = require('./leads');
exports.addLead = leads.addLead;
const users = require('./users');
exports.updateUserProfile = leads.updateUserProfile;
