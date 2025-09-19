// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "vingo-food-delivery-8d334.firebaseapp.com",
  projectId: "vingo-food-delivery-8d334",
  storageBucket: "vingo-food-delivery-8d334.firebasestorage.app",
  messagingSenderId: "710991281833",
  appId: "1:710991281833:web:b7ff6640b0487b55d573b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
export {app,auth}
