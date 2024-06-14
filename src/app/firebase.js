// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxa8bMZdAegAvWjJEyNc0C01Yk2Toow14",
  authDomain: "personal-website-bea1b.firebaseapp.com",
  projectId: "personal-website-bea1b",
  storageBucket: "personal-website-bea1b.appspot.com",
  messagingSenderId: "649643061740",
  appId: "1:649643061740:web:5a65bfd41f0985fd5a50c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
