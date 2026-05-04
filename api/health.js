import { handleHealth, sendJson } from '../server/api.js';

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      sendJson(res, 405, { error: 'Method not allowed.' });
      return;
    }

    await handleHealth(res);
  } catch (error) {
    sendJson(res, 500, { error: error.message || 'Server error.' });
  }
}
