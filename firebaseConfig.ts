// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDA4qgIkSpzqfwaWDhPfgD1_S_6O4ij7XU",
  authDomain: "grwuhi.firebaseapp.com",
  projectId: "grwuhi",
  storageBucket: "grwuhi.firebasestorage.app",
  messagingSenderId: "911358887450",
  appId: "1:911358887450:web:b159135d51ed4a65f9f3a3",
  measurementId: "G-GQS4G365E1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app);
export const db = getFirestore(app);

export const storage = getStorage(app);