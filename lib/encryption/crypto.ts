import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;
const KEY = process.env.ENCRYPTION_KEY as string;

if (!KEY) {
  throw new Error('ENCRYPTION_KEY environment variable is required');
}

export function encrypt(text: string): { encryptedData: string; iv: string; tag: string } {
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, Buffer.from(KEY, 'hex'), iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return {
    encryptedData: encrypted,
    iv: iv.toString('hex'),
    tag: cipher.getAuthTag().toString('hex'),
  };
}

export function decrypt(encrypted: string, iv: string, tag: string): string {
  const decipher = createDecipheriv(
    ALGORITHM,
    Buffer.from(KEY, 'hex'),
    Buffer.from(iv, 'hex')
  );
  
  decipher.setAuthTag(Buffer.from(tag, 'hex'));
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

export function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const salt = randomBytes(16).toString('hex');
      const hash = require('crypto').pbkdf2Sync(
        password,
        salt,
        1000,
        64,
        'sha512'
      ).toString('hex');
      resolve(`${salt}:${hash}`);
    } catch (error) {
      reject(error);
    }
  });
}

export function verifyPassword(storedPassword: string, suppliedPassword: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    try {
      const [salt, hash] = storedPassword.split(':');
      const suppliedHash = require('crypto').pbkdf2Sync(
        suppliedPassword,
        salt,
        1000,
        64,
        'sha512'
      ).toString('hex');
      resolve(hash === suppliedHash);
    } catch (error) {
      reject(error);
    }
  });
}