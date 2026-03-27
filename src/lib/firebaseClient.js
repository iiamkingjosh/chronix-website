import { getApp, getApps, initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCt3ADxIsL_6219TzefQDyEXn51MpBi7Hk',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'chronix-technology.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'chronix-technology',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'chronix-technology.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '747995353302',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:747995353302:web:133f74ed03c78f5fb47977',
};

export function hasFirebaseConfig() {
  return Object.values(firebaseConfig).every((value) => Boolean(value));
}

export function getFirebaseApp() {
  if (!hasFirebaseConfig()) {
    return null;
  }

  if (getApps().length > 0) {
    return getApp();
  }

  return initializeApp(firebaseConfig);
}