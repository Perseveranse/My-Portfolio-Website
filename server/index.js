/* global Buffer, process */

import { createServer } from 'node:http';
import { stat } from 'node:fs/promises';
import { createReadStream, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getBearerToken, signToken, verifyPassword, verifyToken } from './auth.js';
import { findAdminByEmail, hasDatabase, initializeDatabase } from './database.js';
import { readPortfolio, writePortfolio } from './storage.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const port = Number(process.env.PORT || 4174);
const clients = new Set();

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

const sendJson = (res, statusCode, payload) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify(payload));
};

const readJsonBody = async (req) => {
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

const validateContent = (content) => {
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

const broadcastContent = (content) => {
  const payload = `event: portfolio\ndata: ${JSON.stringify(content)}\n\n`;
  for (const client of clients) {
    client.write(payload);
  }
};

const getAuthenticatedAdmin = async (req) => {
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

const loginAdmin = async ({ email, password }) => {
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

const handleApi = async (req, res, pathname) => {
  if (pathname === '/api/health') {
    sendJson(res, 200, {
      ok: true,
      database: hasDatabase() ? 'connected' : 'json-fallback',
    });
    return true;
  }

  if (pathname === '/api/admin/status' && req.method === 'GET') {
    sendJson(res, 200, {
      database: hasDatabase() ? 'connected' : 'json-fallback',
      loginReady: hasDatabase() || Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD),
    });
    return true;
  }

  if (pathname === '/api/admin/login' && req.method === 'POST') {
    const body = await readJsonBody(req);
    const admin = await loginAdmin(body);

    if (!admin) {
      sendJson(res, 401, { error: 'Email or password is incorrect.' });
      return true;
    }

    sendJson(res, 200, {
      token: signToken({ id: admin.id, email: admin.email }),
      user: { email: admin.email },
    });
    return true;
  }

  if (pathname === '/api/admin/me' && req.method === 'GET') {
    const admin = await getAuthenticatedAdmin(req);

    if (!admin) {
      sendJson(res, 401, { error: 'Please log in again.' });
      return true;
    }

    sendJson(res, 200, { user: { email: admin.email } });
    return true;
  }

  if (pathname === '/api/portfolio' && req.method === 'GET') {
    sendJson(res, 200, await readPortfolio());
    return true;
  }

  if (pathname === '/api/events' && req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    });
    res.write('retry: 2000\n\n');
    res.write(`event: portfolio\ndata: ${JSON.stringify(await readPortfolio())}\n\n`);
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return true;
  }

  if (pathname === '/api/portfolio' && (req.method === 'PUT' || req.method === 'POST')) {
    const admin = await getAuthenticatedAdmin(req);
    if (!admin) {
      sendJson(res, 401, { error: 'Please log in again before saving.' });
      return true;
    }

    const content = await readJsonBody(req);
    const validationError = validateContent(content);

    if (validationError) {
      sendJson(res, 400, { error: validationError });
      return true;
    }

    const cleanContent = JSON.parse(JSON.stringify(content));
    const savedContent = await writePortfolio(cleanContent);
    broadcastContent(savedContent);
    sendJson(res, 200, savedContent);
    return true;
  }

  return false;
};

const serveStatic = async (req, res, pathname) => {
  if (!existsSync(distDir)) {
    sendJson(res, 200, {
      ok: true,
      message: 'Portfolio API is running. Start Vite separately for the React app, or run npm run build before serving production.',
    });
    return;
  }

  const requestedPath = decodeURIComponent(pathname);
  const requestedFile = requestedPath === '/' ? 'index.html' : requestedPath.replace(/^\/+/, '');
  const resolvedPath = path.resolve(distDir, requestedFile);
  const relativePath = path.relative(distDir, resolvedPath);
  const isSafePath = relativePath && !relativePath.startsWith('..') && !path.isAbsolute(relativePath);
  const safePath = isSafePath ? resolvedPath : path.join(distDir, 'index.html');
  const finalPath = existsSync(safePath) && (await stat(safePath)).isFile() ? safePath : path.join(distDir, 'index.html');
  const ext = path.extname(finalPath);

  res.writeHead(200, {
    'Content-Type': mimeTypes[ext] || 'application/octet-stream',
  });
  createReadStream(finalPath).pipe(res);
};

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname.startsWith('/api/') && (await handleApi(req, res, url.pathname))) {
      return;
    }

    await serveStatic(req, res, url.pathname);
  } catch (error) {
    sendJson(res, 500, { error: error.message || 'Server error.' });
  }
});

setInterval(() => {
  for (const client of clients) {
    client.write(': heartbeat\n\n');
  }
}, 25000);

await initializeDatabase();

server.listen(port, () => {
  console.log(`Portfolio app running on http://localhost:${port}`);
  console.log(`Storage: ${hasDatabase() ? 'PostgreSQL' : 'JSON fallback'}`);
});
