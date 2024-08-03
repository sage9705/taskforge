import CryptoJS from 'crypto-js';

const USERS_KEY = 'taskforge_users';
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'your-fallback-encryption-key';

interface User {
  id: string;
  email: string;
  passwordHash: string;
}

function encrypt(text: string): string {
  return CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
}

function decrypt(ciphertext: string): string {
  const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export async function getUsers(): Promise<User[]> {
  const encryptedData = localStorage.getItem(USERS_KEY);
  if (!encryptedData) return [];
  const decryptedData = decrypt(encryptedData);
  return JSON.parse(decryptedData);
}

export async function saveUsers(users: User[]): Promise<void> {
  const encryptedData = encrypt(JSON.stringify(users));
  localStorage.setItem(USERS_KEY, encryptedData);
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const users = await getUsers();
  return users.find(user => user.email === email);
}

export async function createUser(email: string, password: string): Promise<User> {
  const users = await getUsers();
  const id = CryptoJS.lib.WordArray.random(16).toString();
  const passwordHash = CryptoJS.SHA256(password).toString();
  const newUser: User = { id, email, passwordHash };
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