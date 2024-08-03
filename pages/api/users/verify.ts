import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import CryptoJS from 'crypto-js';

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || '';
const USE_FILE_STORAGE = process.env.NODE_ENV !== 'production';

let inMemoryUsers: any[] = [];

async function getUsers() {
  if (USE_FILE_STORAGE) {
    if (!fs.existsSync(USERS_FILE)) {
      return [];
    }
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
  } else {
    return inMemoryUsers;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const users = await getUsers();
    const user = users.find((u: any) => u.email === email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordHash = CryptoJS.SHA256(password).toString();

    if (user.passwordHash !== passwordHash) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Don't send the password hash back to the client
    const { passwordHash: _, ...safeUser } = user;

    res.status(200).json({ user: safeUser });
  } catch (error) {
    console.error('Error verifying user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}