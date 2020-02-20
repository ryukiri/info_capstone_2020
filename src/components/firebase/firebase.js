import firebase from 'firebase/app';
import 'firebase/auth';

// Use actual config values from registered firbase app
var config = {
  apiKey: "AIzaSyCaHnCMNqjYFQiNfUJb-5mBnPQovyopYMo",
  authDomain: "ikea-capstone.firebaseapp.com",
  databaseURL: "https://ikea-capstone.firebaseio.com",
  projectId: "ikea-capstone",
  storageBucket: "ikea-capstone.appspot.com",
  messagingSenderId: "258915160699",
  appId: "1:258915160699:web:ca12406998f7c83464c8de",
  measurementId: "G-GQF2VG7GPG"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export { auth };
