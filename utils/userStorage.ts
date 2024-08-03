import fs from 'fs';
import path from 'path';
import CryptoJS from 'crypto-js';

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || '';

interface User {
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

function ensureDataDirectoryExists() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
}

export async function getUsers(): Promise<User[]> {
  ensureDataDirectoryExists();
  if (!fs.existsSync(USERS_FILE)) {
    return [];
  }
  const encryptedData = fs.readFileSync(USERS_FILE, 'utf8');
  const decryptedData = decrypt(encryptedData);
  return JSON.parse(decryptedData);
}

export async function saveUsers(users: User[]): Promise<void> {
  ensureDataDirectoryExists();
  const encryptedData = encrypt(JSON.stringify(users));
  fs.writeFileSync(USERS_FILE, encryptedData);
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const users = await getUsers();
  return users.find(user => user.email === email);
}

export async function findUserByUsername(username: string): Promise<User | undefined> {
  const users = await getUsers();
  return users.find(user => user.username === username);
}

export async function createUser(email: string, username: string, password: string): Promise<User> {
  const users = await getUsers();
  const id = CryptoJS.lib.WordArray.random(16).toString();
  const passwordHash = CryptoJS.SHA256(password).toString();
  const newUser: User = { id, email, username, passwordHash };
  users.push(newUser);
  await saveUsers(users);
  return newUser;
}

export async function verifyUser(email: string, password: string): Promise<User | null> {
  const user = await findUserByEmail(email);
  if (!user) return null;
  const passwordHash = CryptoJS.SHA256(password).toString();
  return user.passwordHash === passwordHash ? user : null;
}