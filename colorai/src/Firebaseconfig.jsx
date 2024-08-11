// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGXny8VPbhri-fzVIDzInMyZRUim3bqLk",
  authDomain: "colorai-619f4.firebaseapp.com",
  databaseURL: "https://colorai-619f4-default-rtdb.firebaseio.com",
  projectId: "colorai-619f4",
  storageBucket: "colorai-619f4.appspot.com",
  messagingSenderId: "504893966490",
  appId: "1:504893966490:web:3f5b771b4f2b7f27c83723",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { db, auth, googleProvider };
