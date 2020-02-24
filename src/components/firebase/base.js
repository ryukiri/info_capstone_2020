import * as firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: 'AIzaSyCaHnCMNqjYFQiNfUJb-5mBnPQovyopYMo',
  authDomain: 'ikea-capstone.firebaseapp.com',
  databaseURL: 'https://ikea-capstone.firebaseio.com',
  projectId: 'ikea-capstone',
  storageBucket: 'ikea-capstone.appspot.com',
  messagingSenderId: '258915160699'
});

export default app;
