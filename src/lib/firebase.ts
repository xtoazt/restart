import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'

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
let app: FirebaseApp | null = null
let auth: Auth | null = null
let db: Firestore | null = null

try {
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getFirestore(app)
} catch (error) {
  console.warn('Firebase initialization failed, using fallback auth:', error)
  // Don't throw error, just set to null
}

export { auth, db }

export default app
