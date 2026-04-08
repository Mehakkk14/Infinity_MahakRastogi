# Firebase Setup Guide

This project now requires Firebase Authentication and Firestore for secure document analysis. Follow these steps to set up Firebase:

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a new project"
3. Enter your project name (e.g., "LegalEase AI")
4. Follow the setup wizard and create the project

## Step 2: Set Up Firebase Authentication

1. In Firebase Console, go to **Authentication** in the left sidebar
2. Click **Get started**
3. Enable **Email/Password** authentication:
   - Click the **Email/Password** provider
   - Toggle on "Email/Password"
   - Click Save

## Step 3: Create Firestore Database

1. Go to **Firestore Database** in the left sidebar
2. Click **Create database**
3. Select **Start in production mode**
4. Choose your preferred location
5. Click **Enable**

## Step 4: Get Your Firebase Configuration

### Client Configuration (for browser):
1. Go to **Project Settings** (gear icon in top left)
2. Click the **General** tab
3. Scroll down to "Your apps" and click the `</>` (Web) option
4. Copy your Firebase config - it will look like:
```javascript
{
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
}
```

### Server Configuration (for Node.js backend):
1. Go to **Project Settings** → **Service Accounts**
2. Click **Generate new private key**
3. Save the JSON file - it contains your credentials

## Step 5: Update .env.local

Update your `.env.local` file with the values from above:

```env
# Firebase Client Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID

# Firebase Admin Configuration
FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
FIREBASE_CLIENT_EMAIL=YOUR_SERVICE_ACCOUNT_EMAIL
FIREBASE_PRIVATE_KEY=YOUR_SERVICE_ACCOUNT_PRIVATE_KEY
```

## Step 6: Firestore Security Rules

Your documents will be stored in a `analyses` collection under each user's ID. Set these rules to ensure only authenticated users can access their own data:

1. Go to **Firestore Database** → **Rules**
2. Replace the default rules with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/analyses/{document=**} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

3. Click **Publish**

## How It Works

- **Signup**: Users create an account with email/password via Firebase Auth
- **Login**: Users sign in with their credentials
- **Analysis**: When authenticated, users can upload documents
- **Storage**: Analyses are stored in Firestore under the user's account
- **History**: Users can access their previous analyses from Firestore

## Testing

1. Start the dev server: `pnpm dev`
2. Visit `http://localhost:3000`
3. Click "Sign up" to create a test account
4. Upload a document and analyze it
5. Your analysis will be securely stored in Firestore

## Troubleshooting

### "Unauthorized - please sign in" error
- Make sure you're logged in
- Check that your ID token is being sent with requests

### Token verification errors
- Ensure your Firebase Admin SDK environment variables are set correctly
- Check that the service account has proper permissions

### Firestore errors
- Verify that Firestore database has been created
- Check Firestore security rules are properly set

For more help, visit the [Firebase Documentation](https://firebase.google.com/docs)
