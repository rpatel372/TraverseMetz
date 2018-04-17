// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBuBMG6mE0B7N80VZYec6Bw5Z9jhGnKgb8',
  Promise: Promise
})

exports.addReq = functions.https.onRequest((req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    return admin.database().ref('/requests').push({original: original}).then((snapshot) => {
      // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
      return res.redirect(303, snapshot.ref.toString());
    });
  });

  // Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.restoreq = functions.database.ref('/requests/{pushId}')
.onCreate((snapshot, context) => {
  // Grab the current value of what was written to the Realtime Database.
  //const original = snapshot.val();
  console.log('Processing request', context.params.pushId);
  const snap=snapshot.val();
  let Lat=snap.startLat;
  let Long=snap.startLong;
  //let startLatitude=snapshot.ref.parent.child('startLat').value;
  //let startLongitude=snapshot.ref.parent.child('startLong').value;
  //making the API calls from firebase
  let countPriority=0;
  for (let call of snap.priorities){
  let params = {location: {lat: Lat,lng: Long},
    radius: 1000,
    type: call};
  googleMapsClient.placesNearby(params).asPromise()
    .then((response) => {
      /* console.log('API call google places');
      let sites=[];
      for (let site of response.json.results){
        let siteToAdd={name: site.name,
          location: site.geometrylocation,
          rating: site.rating,
          //pricing: site.pricing,
          types: site.types,
          opening_hours: site.opening_hours}
          sites.push(siteToAdd);
      }
      console.log('push'+sites); */
      snapshot.ref.child('response/'/*+countPriority*/+call).set(response.json.results);
      countPriority+=1;
    })
    .catch((err) =>{
      console.log(err);
    });
  }

  // You must return a Promise when performing asynchronous tasks inside a Functions such as
  // writing to the Firebase Realtime Database.
  // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
  return snapshot.ref.child('processed').set(snap.priorities[0]);
});

