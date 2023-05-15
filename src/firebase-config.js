// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBne4ECIfuv2Exz2XSDzplds7HwjjSegxg",
  authDomain: "deluxojourney.firebaseapp.com",
  projectId: "deluxojourney",
  storageBucket: "deluxojourney.appspot.com",
  messagingSenderId: "924185484023",
  appId: "1:924185484023:web:854550ec30ad72d46d11f2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const Auth = getAuth(app);
export const Provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
