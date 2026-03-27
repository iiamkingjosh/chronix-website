import { getAuth } from 'firebase-admin/auth';
import { getAdminApp } from '@/lib/firebaseAdmin';

function getAllowedAdminEmails() {
  const raw = process.env.ADMIN_EMAIL_ALLOWLIST || '';
  return raw
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

function extractBearerToken(request) {
  const authHeader = request.headers.get('authorization') || '';
  if (!authHeader.toLowerCase().startsWith('bearer ')) {
    return null;
  }

  return authHeader.slice(7).trim();
}

export async function verifyAdminRequest(request, options = {}) {
  const { optional = false } = options;
  const token = extractBearerToken(request);

  if (!token) {
    if (optional) {
      return { ok: false, status: 200, error: null, decodedToken: null };
    }

    return { ok: false, status: 401, error: 'Missing authorization token', decodedToken: null };
  }

  try {
    const auth = getAuth(getAdminApp());
    const decodedToken = await auth.verifyIdToken(token);
    const email = (decodedToken.email || '').toLowerCase();
    const allowedEmails = getAllowedAdminEmails();

    if (allowedEmails.length > 0 && !allowedEmails.includes(email)) {
      return { ok: false, status: 403, error: 'User is not allowed to access admin actions', decodedToken: null };
    }

    return { ok: true, status: 200, error: null, decodedToken };
  } catch (error) {
    console.error('Admin token verification failed:', error);
    return { ok: false, status: 401, error: 'Invalid or expired authorization token', decodedToken: null };
  }
}