import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { getFirebaseApp, hasFirebaseConfig } from './firebaseClient';
import { getCurrentUserIdToken } from '@/lib/firebaseAuth';

const MAX_DIMENSION = 1920;
const WEBP_QUALITY = 0.85;

function compressImage(file) {
  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let { width, height } = img;
      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        if (width >= height) {
          height = Math.round((height * MAX_DIMENSION) / width);
          width = MAX_DIMENSION;
        } else {
          width = Math.round((width * MAX_DIMENSION) / height);
          height = MAX_DIMENSION;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob && blob.size < file.size) {
            resolve(new File([blob], file.name.replace(/\.[^.]+$/, '.webp'), { type: 'image/webp' }));
          } else {
            resolve(file);
          }
        },
        'image/webp',
        WEBP_QUALITY,
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(file);
    };

    img.src = objectUrl;
  });
}

function normalizeForFilename(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function getFileExtension(file) {
  const extensionFromName = String(file?.name || '').split('.').pop();
  if (extensionFromName && extensionFromName !== file?.name) {
    return extensionFromName.toLowerCase();
  }

  if (file?.type === 'image/png') return 'png';
  if (file?.type === 'image/webp') return 'webp';
  if (file?.type === 'image/avif') return 'avif';
  return 'jpg';
}

export async function uploadBlogCoverImage({ file, title }) {
  if (!file) {
    throw new Error('Please select an image first.');
  }

  const token = await getCurrentUserIdToken();
  if (!token) {
    throw new Error('You must sign in with an authorized admin account before uploading images.');
  }

  if (!hasFirebaseConfig()) {
    throw new Error('Firebase is not configured yet. Add Firebase env keys first.');
  }

  const app = getFirebaseApp();
  if (!app) {
    throw new Error('Unable to initialize Firebase app.');
  }

  const storage = getStorage(app);
  const compressed = await compressImage(file);
  const extension = getFileExtension(compressed);
  const titleSlug = normalizeForFilename(title);
  const baseName = titleSlug || normalizeForFilename(file.name) || 'chronix-blog-image';
  const filename = `${baseName}-${Date.now()}.${extension}`;
  const objectPath = `blog/covers/${filename}`;

  const storageRef = ref(storage, objectPath);
  await uploadBytes(storageRef, compressed, {
    contentType: compressed.type || 'image/webp',
    cacheControl: 'public,max-age=31536000,immutable',
  });

  const url = await getDownloadURL(storageRef);

  return {
    url,
    objectPath,
    filename,
  };
}

export async function uploadBlogContentImage({ file }) {
  if (!file) {
    throw new Error('No file provided.');
  }

  const token = await getCurrentUserIdToken();
  if (!token) {
    throw new Error('You must sign in with an authorized admin account before uploading images.');
  }

  if (!hasFirebaseConfig()) {
    throw new Error('Firebase is not configured yet. Add Firebase env keys first.');
  }

  const app = getFirebaseApp();
  if (!app) {
    throw new Error('Unable to initialize Firebase app.');
  }

  const storage = getStorage(app);
  const compressed = await compressImage(file);
  const extension = getFileExtension(compressed);
  const baseName = normalizeForFilename(file.name) || 'chronix-content-image';
  const filename = `${baseName}-${Date.now()}.${extension}`;
  const objectPath = `blog/content/${filename}`;

  const storageRef = ref(storage, objectPath);
  await uploadBytes(storageRef, compressed, {
    contentType: compressed.type || 'image/webp',
    cacheControl: 'public,max-age=31536000,immutable',
  });

  const url = await getDownloadURL(storageRef);

  return { url, objectPath, filename };
}