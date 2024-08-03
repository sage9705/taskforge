import fs from 'fs';
import path from 'path';
import CryptoJS from 'crypto-js';
import { Todo } from '../store/slices/todosSlice';

const TODOS_FILE = path.join(process.cwd(), 'data', 'todos.json');
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || '';

function encrypt(text: string): string {
  return CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
}

function decrypt(ciphertext: string): string {
  const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

function ensureDataDirectoryExists() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
}

export async function getTodos(userId: string): Promise<Todo[]> {
  ensureDataDirectoryExists();
  if (!fs.existsSync(TODOS_FILE)) {
    return [];
  }
  const encryptedData = fs.readFileSync(TODOS_FILE, 'utf8');
  const decryptedData = decrypt(encryptedData);
  const allTodos = JSON.parse(decryptedData);
  return allTodos[userId] || [];
}

export async function saveTodos(userId: string, todos: Todo[]): Promise<void> {
  ensureDataDirectoryExists();
  let allTodos = {};
  if (fs.existsSync(TODOS_FILE)) {
    const encryptedData = fs.readFileSync(TODOS_FILE, 'utf8');
    const decryptedData = decrypt(encryptedData);
    allTodos = JSON.parse(decryptedData);
  }
  allTodos[userId] = todos;
  const encryptedData = encrypt(JSON.stringify(allTodos));
  fs.writeFileSync(TODOS_FILE, encryptedData);
}