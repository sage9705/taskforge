import CryptoJS from 'crypto-js';
import { Todo } from '../store/slices/todosSlice';

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || '';

function encrypt(text: string): string {
  return CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
}

function decrypt(ciphertext: string): string {
  const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export async function getTodos(userId: string): Promise<Todo[]> {
  const response = await fetch(`/api/todos?userId=${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  const data = await response.json();
  return JSON.parse(decrypt(data.encryptedTodos));
}

export async function saveTodos(userId: string, todos: Todo[]): Promise<void> {
  const encryptedTodos = encrypt(JSON.stringify(todos));
  const response = await fetch('/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, encryptedTodos }),
  });
  if (!response.ok) {
    throw new Error('Failed to save todos');
  }
}