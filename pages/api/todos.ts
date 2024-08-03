import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const TODOS_FILE = path.join(process.cwd(), 'data', 'todos.json');

function ensureDataDirectoryExists() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
}

interface TodoData {
  [userId: string]: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  ensureDataDirectoryExists();

  if (req.method === 'GET') {
    const { userId } = req.query;
    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ error: 'Invalid userId' });
    }

    try {
      if (!fs.existsSync(TODOS_FILE)) {
        return res.status(200).json({ encryptedTodos: '' });
      }
      const data: TodoData = JSON.parse(fs.readFileSync(TODOS_FILE, 'utf8'));
      res.status(200).json({ encryptedTodos: data[userId] || '' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to read todos' });
    }
  } else if (req.method === 'POST') {
    const { userId, encryptedTodos } = req.body as { userId: string; encryptedTodos: string };
    if (!userId || !encryptedTodos) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    try {
      let data: TodoData = {};
      if (fs.existsSync(TODOS_FILE)) {
        data = JSON.parse(fs.readFileSync(TODOS_FILE, 'utf8'));
      }
      data[userId] = encryptedTodos;
      fs.writeFileSync(TODOS_FILE, JSON.stringify(data));
      res.status(200).json({ message: 'Todos saved successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save todos' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}