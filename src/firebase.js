// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALPH-7P8zSBM1LhKJxmGfenKd9uEK1u00",
  authDomain: "mbottle-29df3.firebaseapp.com",
  projectId: "mbottle-29df3",
  storageBucket: "mbottle-29df3.firebasestorage.app",
  messagingSenderId: "679998291538",
  appId: "1:679998291538:web:e6040fcdfa4d99810a298b",
  measurementId: "G-WCQKQ2ML9H",
}

// Initialize Firebase

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const db = getFirestore(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { db, auth, provider }
