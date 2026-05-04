/* global Buffer, process */

import { createHmac, pbkdf2Sync, randomBytes, timingSafeEqual } from 'node:crypto';
import { loadEnv } from './env.js';

loadEnv();

const iterations = 210000;
const keyLength = 64;
const digest = 'sha512';
const tokenTtlSeconds = 60 * 60 * 12;

const base64UrlEncode = (value) =>
  Buffer.from(JSON.stringify(value))
    .toString('base64url');

const base64UrlDecode = (value) => JSON.parse(Buffer.from(value, 'base64url').toString('utf8'));

const getSessionSecret = () => {
  if (!process.env.SESSION_SECRET && process.env.NODE_ENV === 'production') {
    throw new Error('SESSION_SECRET is required in production.');
  }

  return process.env.SESSION_SECRET || 'local-development-session-secret';
};

export const hashPassword = (password) => {
  const salt = randomBytes(32).toString('base64url');
  const hash = pbkdf2Sync(password, salt, iterations, keyLength, digest).toString('base64url');

  return {
    salt,
    hash,
    iterations,
  };
};

export const verifyPassword = (password, user) => {
  const expectedHash = Buffer.from(user.password_hash, 'base64url');
  const actualHash = pbkdf2Sync(password, user.password_salt, user.password_iterations, keyLength, digest);

  return expectedHash.length === actualHash.length && timingSafeEqual(expectedHash, actualHash);
};

export const signToken = (payload) => {
  const now = Math.floor(Date.now() / 1000);
  const header = base64UrlEncode({ alg: 'HS256', typ: 'JWT' });
  const body = base64UrlEncode({
    ...payload,
    iat: now,
    exp: now + tokenTtlSeconds,
  });
  const signature = createHmac('sha256', getSessionSecret())
    .update(`${header}.${body}`)
    .digest('base64url');

  return `${header}.${body}.${signature}`;
};

export const verifyToken = (token) => {
  if (!token) return null;

  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [header, body, signature] = parts;
  const expectedSignature = createHmac('sha256', getSessionSecret())
    .update(`${header}.${body}`)
    .digest('base64url');

  const expected = Buffer.from(expectedSignature);
  const actual = Buffer.from(signature);

  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    return null;
  }

  const payload = base64UrlDecode(body);
  if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }

  return payload;
};

export const getBearerToken = (req) => {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  return scheme === 'Bearer' ? token : null;
};
