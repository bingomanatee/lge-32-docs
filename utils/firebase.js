import app from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDThcYMjFjeZHiASGRo6WInb9vZqahY7qU",
  authDomain: "sample-lge-shop.firebaseapp.com",
  databaseURL: "https://sample-lge-shop.firebaseio.com",
  projectId: "sample-lge-shop",
  storageBucket: "sample-lge-shop.appspot.com",
  messagingSenderId: "806368796487",
  appId: "1:806368796487:web:650f261d3cba33bd19b662",
  measurementId: "G-MZE8T1ZVKV"
};

/*
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
*/

app.initializeApp(firebaseConfig);
app.analytics();

class Firebase {
  constructor() {
    this.auth = app.auth();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  doSignInWithEmailAndPassword(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  doSignOut() {
    this.auth.signOut();
  }

  doPasswordReset(email) {
    this.auth.sendPasswordResetEmail(email);
  }

  doPasswordUpdate(password) {
    this.auth.currentUser.updatePassword(password);
  }
}
