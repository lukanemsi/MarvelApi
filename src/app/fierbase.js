// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBrr-KNxcLYVvAwpbz_ZGZjgPAvOIEl4qU",
  authDomain: "marvel-api-project-61893.firebaseapp.com",
  projectId: "marvel-api-project-61893",
  storageBucket: "marvel-api-project-61893.appspot.com",
  messagingSenderId: "719293541288",
  appId: "1:719293541288:web:c93d3264b128ef6b9d4b9d",
  measurementId: "G-429CCDZ4KJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);