import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7XW2Qd_seGEYhtdQ_UjRhLP1zZDWl5GY",
  authDomain: "restartxxxx.firebaseapp.com",
  projectId: "restartxxxx",
  storageBucket: "restartxxxx.firebasestorage.app",
  messagingSenderId: "559220741231",
  appId: "1:559220741231:web:ac517ca6c1b15badc1a99a"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

export default app
