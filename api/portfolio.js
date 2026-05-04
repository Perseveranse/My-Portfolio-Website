import { handlePortfolio, sendJson } from '../server/api.js';

export default async function handler(req, res) {
  try {
    await handlePortfolio(req, res);
  } catch (error) {
    sendJson(res, 500, { error: error.message || 'Server error.' });
  }
}
