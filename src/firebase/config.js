// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVfNNRIdrxakO03fmQcIciQqILxvpyBAQ",
  authDomain: "proyecto-final-cfgs-b7b73.firebaseapp.com",
  projectId: "proyecto-final-cfgs-b7b73",
  storageBucket: "proyecto-final-cfgs-b7b73.appspot.com",
  messagingSenderId: "701448775309",
  appId: "1:701448775309:web:285d34301e59af798ba4c4"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
// Para realizar la autenticación con firebase
export const FirebaseAuth = getAuth( FirebaseApp );
// Para utilizar la DDBB - de firebase cloud
export const FirebaseDB = getFirestore( FirebaseApp );