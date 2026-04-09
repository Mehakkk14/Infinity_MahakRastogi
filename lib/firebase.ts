import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

let firebaseApp: ReturnType<typeof initializeApp> | null = null
let firebaseAuth: ReturnType<typeof getAuth> | null = null
let firebaseDb: ReturnType<typeof getFirestore> | null = null
let initialized = false

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

function initializeFirebase() {
  // Skip if already initialized
  if (initialized) return
  
  // Skip if we're in a build environment (no valid config)
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    console.warn('Firebase config incomplete, skipping initialization')
    initialized = true
    return
  }

  try {
    firebaseApp = initializeApp(firebaseConfig)
    firebaseAuth = getAuth(firebaseApp)
    firebaseDb = getFirestore(firebaseApp)
    initialized = true
  } catch (error) {
    console.warn('Firebase initialization error (may be build time):', error)
    initialized = true
  }
}

// Only initialize if we're on the client side
if (typeof window !== 'undefined') {
  initializeFirebase()
}

export const app = firebaseApp
export const auth = firebaseAuth
export const db = firebaseDb
