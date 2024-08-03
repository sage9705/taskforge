import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || '';

export interface User {
  id: string;
  email: string;
  username: string;
  passwordHash: string;
}

function encrypt(text: string): string {
  return CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
}

function decrypt(ciphertext: string): string {
  const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const response = await fetch(`/api/users?email=${encodeURIComponent(email)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  const data = await response.json();
  return data.user ? JSON.parse(decrypt(data.user)) : undefined;
}

export async function findUserByUsername(username: string): Promise<User | undefined> {
  const response = await fetch(`/api/users?username=${encodeURIComponent(username)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  const data = await response.json();
  return data.user ? JSON.parse(decrypt(data.user)) : undefined;
}

export async function createUser(email: string, username: string, password: string): Promise<User> {
  const id = CryptoJS.lib.WordArray.random(16).toString();
  const passwordHash = CryptoJS.SHA256(password).toString();
  const newUser: User = { id, email, username, passwordHash };
  const encryptedUser = encrypt(JSON.stringify(newUser));

  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ encryptedUser }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create user');
  }

  return newUser;
}

export async function verifyUser(email: string, password: string): Promise<User | null> {
  const user = await findUserByEmail(email);
  if (!user) return null;
  const passwordHash = CryptoJS.SHA256(password).toString();
  return user.passwordHash === passwordHash ? user : null;
}