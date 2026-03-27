import { getApp, getApps, initializeApp, cert } from 'firebase-admin/app';

function buildCredential() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const rawPrivateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !rawPrivateKey) {
    return null;
  }

  // Vercel and most CI systems encode \n as literal \\n in env vars.
  const privateKey = rawPrivateKey.replace(/\\n/g, '\n');

  return cert({ projectId, clientEmail, privateKey });
}

export function getAdminApp() {
  if (getApps().length > 0) {
    return getApp();
  }

  const credential = buildCredential();
  if (!credential) {
    throw new Error(
      'Firebase Admin is not configured. Add FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY to .env.local'
    );
  }

  return initializeApp({ credential });
}
