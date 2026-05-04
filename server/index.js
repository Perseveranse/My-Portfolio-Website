/* global process */

import { createServer } from 'node:http';
import { stat } from 'node:fs/promises';
import { createReadStream, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { hasDatabase } from './database.js';
import {
  ensureDatabaseReady,
  handleAdminLogin,
  handleAdminMe,
  handleAdminStatus,
  handleEvents,
  handleHealth,
  handlePortfolio,
  sendJson,
} from './api.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const port = Number(process.env.PORT || 4174);

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

const handleApi = async (req, res, pathname) => {
  if (pathname === '/api/health') {
    await handleHealth(res);
    return true;
  }

  if (pathname === '/api/admin/status' && req.method === 'GET') {
    await handleAdminStatus(res);
    return true;
  }

  if (pathname === '/api/admin/login' && req.method === 'POST') {
    await handleAdminLogin(req, res);
    return true;
  }

  if (pathname === '/api/admin/me' && req.method === 'GET') {
    await handleAdminMe(req, res);
    return true;
  }

  if (pathname === '/api/portfolio' && req.method === 'GET') {
    await handlePortfolio(req, res);
    return true;
  }

  if (pathname === '/api/events' && req.method === 'GET') {
    await handleEvents(res);
    return true;
  }

  if (pathname === '/api/portfolio' && (req.method === 'PUT' || req.method === 'POST')) {
    await handlePortfolio(req, res);
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

await ensureDatabaseReady();

server.listen(port, () => {
  console.log(`Portfolio app running on http://localhost:${port}`);
  console.log(`Storage: ${hasDatabase() ? 'PostgreSQL' : 'JSON fallback'}`);
});
