import { DecodedIdToken, getAuth } from 'firebase-admin/auth'
import admin from 'firebase-admin'

let adminInitialized = false

// Lazy-initialize Firebase Admin to avoid issues during build
// Only initialize if we have all required environment variables
function initializeFirebaseAdmin() {
  if (adminInitialized || admin.apps.length > 0) {
    return
  }

  // Skip initialization if environment variables are missing (build time)
  if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
    console.warn('Firebase Admin credentials not available, skipping initialization (likely build time)')
    return
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    })
    adminInitialized = true
  } catch (error) {
    console.error('Firebase Admin initialization error:', error)
    throw error
  }
}

export const verifyIdToken = async (token: string) => {
  try {
    initializeFirebaseAdmin()
    
    // If Firebase Admin isn't initialized, we can't verify
    if (!adminInitialized || admin.apps.length === 0) {
      throw new Error('Firebase Admin not initialized. Missing credentials.')
    }
    
    const decodedToken = await getAuth().verifyIdToken(token)
    return decodedToken
  } catch (error) {
    throw new Error('Invalid or expired token')
  }
}

export const getAuthToken = (req: Request): string | null => {
  const authHeader = req.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return authHeader.substring(7)
}
