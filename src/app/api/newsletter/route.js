import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

const dataDir = path.join(process.cwd(), 'content', 'newsletter');
const subscribersFilePath = path.join(dataDir, 'subscribers.json');

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function readSubscribers() {
  if (!fs.existsSync(subscribersFilePath)) {
    return [];
  }

  try {
    const raw = fs.readFileSync(subscribersFilePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeSubscribers(subscribers) {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(subscribersFilePath, JSON.stringify(subscribers, null, 2));
}

export async function POST(request) {
  try {
    const { fullName, email } = await request.json();
    const normalizedFullName = String(fullName || '').trim();
    const normalizedEmail = String(email || '').trim().toLowerCase();

    if (!normalizedFullName) {
      return new Response(JSON.stringify({ error: 'Please provide your full name.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!normalizedEmail || !isValidEmail(normalizedEmail)) {
      return new Response(JSON.stringify({ error: 'Please provide a valid email address.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const subscribers = readSubscribers();
    const exists = subscribers.some((subscriber) => subscriber.email === normalizedEmail);

    if (exists) {
      return new Response(JSON.stringify({ message: 'You are already subscribed.' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    subscribers.push({
      fullName: normalizedFullName,
      email: normalizedEmail,
      subscribedAt: new Date().toISOString(),
      source: 'website_footer',
    });

    writeSubscribers(subscribers);

    return new Response(JSON.stringify({ message: 'Subscribed successfully.' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return new Response(JSON.stringify({ error: 'Failed to subscribe. Please try again.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
