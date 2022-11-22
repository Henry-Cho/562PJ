// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
import "firebase/storage"
import "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBY3n-u31sYFXub4sCnIpSOh1L1DF2PRyg",
  authDomain: "pj-e6235.firebaseapp.com",
  projectId: "pj-e6235",
  storageBucket: "pj-e6235.appspot.com",
  messagingSenderId: "892918644805",
  appId: "1:892918644805:web:ab4967b03fc7ba3406232c",
  measurementId: "G-5HCB6DPXZG"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
}
else {
    app = firebase.app();
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const apiKey = firebaseConfig.apiKey;


export { auth, firestore, storage, apiKey };