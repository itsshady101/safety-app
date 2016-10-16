 import firebase from 'firebase';
// Firebase Config
var config = {
  apiKey: "AIzaSyA5U0894vpoQGQXyXa550jn_VxQL33szcU",
  authDomain: "roshan-fc4e0.firebaseapp.com",
  databaseURL: "https://roshan-fc4e0.firebaseio.com",
  storageBucket: "roshan-fc4e0.appspot.com",
  messagingSenderId: "454221861422"
};
let q = firebase.initializeApp(config);
let db = q.database();
// ends here
export {q, db};
