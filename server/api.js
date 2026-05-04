/* global Buffer, process */

import { getBearerToken, signToken, verifyPassword, verifyToken } from './auth.js';
import { findAdminByEmail, hasDatabase, initializeDatabase } from './database.js';
import { readPortfolio, writePortfolio } from './storage.js';

let databaseReadyPromise;

export const ensureDatabaseReady = () => {
  databaseReadyPromise ||= initializeDatabase();
  return databaseReadyPromise;
};

export const sendJson = (res, statusCode, payload) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify(payload));
};

export const readJsonBody = async (req) => {
  const chunks = [];
  let size = 0;

  for await (const chunk of req) {
    size += chunk.length;
    if (size > 1024 * 1024) {
      throw new Error('Request body is too large.');
    }
    chunks.push(chunk);
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
};

export const validateContent = (content) => {
  const requiredArrays = ['metrics', 'stack', 'capabilities', 'projects', 'workflow', 'experience', 'credentials'];

  if (!content || typeof content !== 'object' || Array.isArray(content)) {
    return 'Portfolio content must be a JSON object.';
  }

  if (!content.profile || typeof content.profile !== 'object' || Array.isArray(content.profile)) {
    return 'Portfolio content must include a profile object.';
  }

  const missingArray = requiredArrays.find((key) => !Array.isArray(content[key]));
  if (missingArray) {
    return `Portfolio content must include a ${missingArray} array.`;
  }

  return null;
};

export const getAuthenticatedAdmin = async (req) => {
  const payload = verifyToken(getBearerToken(req));
  if (!payload?.email) return null;

  const databaseAdmin = await findAdminByEmail(payload.email);
  if (databaseAdmin) {
    return {
      id: databaseAdmin.id,
      email: databaseAdmin.email,
    };
  }

  if (!hasDatabase() && payload.email === process.env.ADMIN_EMAIL?.toLowerCase()) {
    return {
      id: 'env-admin',
      email: payload.email,
    };
  }

  return null;
};

const verifyEnvAdmin = (email, password) =>
  !hasDatabase() &&
  process.env.ADMIN_EMAIL &&
  process.env.ADMIN_PASSWORD &&
  email.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase() &&
  password === process.env.ADMIN_PASSWORD;

export const loginAdmin = async ({ email, password }) => {
  if (!email || !password) {
    return null;
  }

  const databaseAdmin = await findAdminByEmail(email);
  if (databaseAdmin && verifyPassword(password, databaseAdmin)) {
    return {
      id: databaseAdmin.id,
      email: databaseAdmin.email,
    };
  }

  if (verifyEnvAdmin(email, password)) {
    return {
      id: 'env-admin',
      email: process.env.ADMIN_EMAIL.toLowerCase(),
    };
  }

  return null;
};

export const handleHealth = async (res) => {
  await ensureDatabaseReady();
  sendJson(res, 200, {
    ok: true,
    database: hasDatabase() ? 'connected' : 'json-fallback',
  });
};

export const handleAdminStatus = async (res) => {
  await ensureDatabaseReady();
  sendJson(res, 200, {
    database: hasDatabase() ? 'connected' : 'json-fallback',
    loginReady: hasDatabase() || Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD),
  });
};

export const handleAdminLogin = async (req, res) => {
  await ensureDatabaseReady();
  const body = await readJsonBody(req);
  const admin = await loginAdmin(body);

  if (!admin) {
    sendJson(res, 401, { error: 'Email or password is incorrect.' });
    return;
  }

  sendJson(res, 200, {
    token: signToken({ id: admin.id, email: admin.email }),
    user: { email: admin.email },
  });
};

export const handleAdminMe = async (req, res) => {
  await ensureDatabaseReady();
  const admin = await getAuthenticatedAdmin(req);

  if (!admin) {
    sendJson(res, 401, { error: 'Please log in again.' });
    return;
  }

  sendJson(res, 200, { user: { email: admin.email } });
};

export const handlePortfolio = async (req, res) => {
  await ensureDatabaseReady();

  if (req.method === 'GET') {
    sendJson(res, 200, await readPortfolio());
    return;
  }

  if (req.method === 'PUT' || req.method === 'POST') {
    const admin = await getAuthenticatedAdmin(req);
    if (!admin) {
      sendJson(res, 401, { error: 'Please log in again before saving.' });
      return;
    }

    const content = await readJsonBody(req);
    const validationError = validateContent(content);

    if (validationError) {
      sendJson(res, 400, { error: validationError });
      return;
    }

    const cleanContent = JSON.parse(JSON.stringify(content));
    sendJson(res, 200, await writePortfolio(cleanContent));
    return;
  }

  sendJson(res, 405, { error: 'Method not allowed.' });
};

export const handleEvents = async (res) => {
  await ensureDatabaseReady();
  const content = await readPortfolio();

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
  });
  res.end(`event: portfolio\ndata: ${JSON.stringify(content)}\n\n`);
};
