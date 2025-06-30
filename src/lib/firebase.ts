// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXbzU-Bd54LCoe_6Fsed2CwScjji4RjKQ",
  authDomain: "splitwise-clone-1ea44.firebaseapp.com",
  projectId: "splitwise-clone-1ea44",
  storageBucket: "splitwise-clone-1ea44.firebasestorage.app",
  messagingSenderId: "1030279318623",
  appId: "1:1030279318623:web:274620f8c146f3d8c8dfea",
  measurementId: "G-DB6PTJ95PR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth }; 