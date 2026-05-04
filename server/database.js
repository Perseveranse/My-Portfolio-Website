/* global process */

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client, Pool } from 'pg';
import { loadEnv } from './env.js';
import { hashPassword } from './auth.js';

loadEnv();

const configuredConnectionString = process.env.DATABASE_URL;
const connectionString = configuredConnectionString?.includes('PUT_YOUR_POSTGRES_PASSWORD_HERE')
  ? null
  : configuredConnectionString;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const seedContentPath = path.join(rootDir, 'src', 'data', 'portfolio-content.json');

const readSeedContent = async () => JSON.parse(await readFile(seedContentPath, 'utf8'));

const shouldUseSsl = () => {
  if (process.env.POSTGRES_SSL === 'false') return false;
  if (!connectionString) return false;
  return !connectionString.includes('localhost') && !connectionString.includes('127.0.0.1');
};

export const pool = connectionString
  ? new Pool({
      connectionString,
      ssl: shouldUseSsl() ? { rejectUnauthorized: false } : false,
    })
  : null;

pool?.on('error', (error) => {
  console.error('Unexpected PostgreSQL pool error:', error.message);
});

export const hasDatabase = () => Boolean(pool);

const quoteIdentifier = (value) => `"${value.replace(/"/g, '""')}"`;

const getDatabaseName = () => {
  if (!connectionString) return null;

  const url = new URL(connectionString);
  return decodeURIComponent(url.pathname.replace(/^\//, ''));
};

const getMaintenanceConnectionString = () => {
  const url = new URL(connectionString);
  url.pathname = '/postgres';
  return url.toString();
};

const createDatabaseIfMissing = async () => {
  const databaseName = getDatabaseName();

  if (!databaseName || databaseName === 'postgres') return;

  const client = new Client({
    connectionString: getMaintenanceConnectionString(),
    ssl: shouldUseSsl() ? { rejectUnauthorized: false } : false,
  });

  await client.connect();

  try {
    const existing = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [databaseName]);

    if (existing.rowCount === 0) {
      await client.query(`CREATE DATABASE ${quoteIdentifier(databaseName)}`);
    }
  } finally {
    await client.end();
  }
};

const queryWithDatabaseCreation = async (query, params) => {
  try {
    return await pool.query(query, params);
  } catch (error) {
    if (error.code !== '3D000') {
      throw error;
    }

    await createDatabaseIfMissing();
    return pool.query(query, params);
  }
};

export const initializeDatabase = async () => {
  if (!pool) return false;

  await queryWithDatabaseCreation(`
    CREATE TABLE IF NOT EXISTS portfolio_content (
      id TEXT PRIMARY KEY,
      content JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      password_salt TEXT NOT NULL,
      password_iterations INTEGER NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  const existingContent = await pool.query('SELECT id FROM portfolio_content WHERE id = $1', ['main']);
  if (existingContent.rowCount === 0) {
    const seedContent = await readSeedContent();
    await pool.query('INSERT INTO portfolio_content (id, content) VALUES ($1, $2)', ['main', seedContent]);
  }

  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    const existingAdmin = await pool.query('SELECT id FROM admin_users WHERE email = $1', [
      process.env.ADMIN_EMAIL.toLowerCase(),
    ]);
    const password = hashPassword(process.env.ADMIN_PASSWORD);

    if (existingAdmin.rowCount === 0) {
      await pool.query(
        `
          INSERT INTO admin_users (email, password_hash, password_salt, password_iterations)
          VALUES ($1, $2, $3, $4)
        `,
        [process.env.ADMIN_EMAIL.toLowerCase(), password.hash, password.salt, password.iterations],
      );
    } else {
      await pool.query(
        `
          UPDATE admin_users
          SET password_hash = $2,
              password_salt = $3,
              password_iterations = $4,
              updated_at = NOW()
          WHERE email = $1
        `,
        [process.env.ADMIN_EMAIL.toLowerCase(), password.hash, password.salt, password.iterations],
      );
    }
  }

  return true;
};

export const readPortfolioFromDatabase = async () => {
  const result = await pool.query('SELECT content FROM portfolio_content WHERE id = $1', ['main']);
  return result.rows[0]?.content || readSeedContent();
};

export const writePortfolioToDatabase = async (content) => {
  const result = await pool.query(
    `
      INSERT INTO portfolio_content (id, content, updated_at)
      VALUES ($1, $2, NOW())
      ON CONFLICT (id)
      DO UPDATE SET content = EXCLUDED.content, updated_at = NOW()
      RETURNING content
    `,
    ['main', content],
  );

  return result.rows[0].content;
};

export const findAdminByEmail = async (email) => {
  if (!pool) return null;

  const result = await pool.query('SELECT * FROM admin_users WHERE email = $1', [email.toLowerCase()]);
  return result.rows[0] || null;
};
