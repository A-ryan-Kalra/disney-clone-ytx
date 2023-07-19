// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1uKeAEJ4_-SFypOnKgqbZaBD38iJryMY",
  authDomain: "disney-clone-f2834.firebaseapp.com",
  projectId: "disney-clone-f2834",
  storageBucket: "disney-clone-f2834.appspot.com",
  messagingSenderId: "864725399265",
  appId: "1:864725399265:web:79b82ba46c5f461b1aa9a0",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
