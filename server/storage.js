/* global process */

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { hasDatabase, readPortfolioFromDatabase, writePortfolioToDatabase } from './database.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const contentPath = process.env.PORTFOLIO_CONTENT_PATH || path.join(rootDir, 'src', 'data', 'portfolio-content.json');

export const readPortfolio = async () => {
  if (hasDatabase()) {
    return readPortfolioFromDatabase();
  }

  return JSON.parse(await readFile(contentPath, 'utf8'));
};

export const writePortfolio = async (content) => {
  if (hasDatabase()) {
    return writePortfolioToDatabase(content);
  }

  await writeFile(contentPath, `${JSON.stringify(content, null, 2)}\n`);
  return content;
};
