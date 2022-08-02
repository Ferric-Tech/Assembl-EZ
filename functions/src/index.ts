// How to write functions accross multiple files:
// https://firebase.google.com/docs/functions/organize-functions#write_functions_in_multiple_files

const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const functions = require('firebase-functions');
admin.initializeApp(functions.config().firebase);

const leadsModule = require('./leads');
const usersModule = require('./users');

exports.addLead = leadsModule.addLead;
exports.updateUserProfile = usersModule.updateUserProfile;
