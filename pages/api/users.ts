import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

function ensureDataDirectoryExists() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  ensureDataDirectoryExists();

  if (req.method === 'GET') {
    const { email, username } = req.query;
    
    try {
      if (!fs.existsSync(USERS_FILE)) {
        return res.status(200).json({ user: null });
      }
      const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
      let user = null;
      if (email) {
        user = users.find((u: any) => u.email === email);
      } else if (username) {
        user = users.find((u: any) => u.username === username);
      }
      res.status(200).json({ user: user ? JSON.stringify(user) : null });
    } catch (error) {
      res.status(500).json({ error: 'Failed to read users' });
    }
  } else if (req.method === 'POST') {
    const { encryptedUser } = req.body;
    if (!encryptedUser) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    try {
      let users = [];
      if (fs.existsSync(USERS_FILE)) {
        users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
      }
      users.push(JSON.parse(encryptedUser));
      fs.writeFileSync(USERS_FILE, JSON.stringify(users));
      res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}