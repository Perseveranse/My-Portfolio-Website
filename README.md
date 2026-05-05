# Cornelius Portfolio

React, Vite, Node, and PostgreSQL portfolio app with a secure admin dashboard for real-time content updates.

## Local Development

Install dependencies:

```powershell
npm.cmd install
```

Create a local `.env` from `.env.example`, then run the app. The Node server loads `.env` automatically in local development:

```powershell
npm.cmd run server
npm.cmd run dev
```

The backend uses PostgreSQL when `DATABASE_URL` is set. If `DATABASE_URL` is missing, it falls back to `src/data/portfolio-content.json` for local development only.

For the local PostgreSQL 18 install on this machine, use:

```env
DATABASE_URL=postgresql://postgres:YOUR_POSTGRES_PASSWORD@localhost:5432/my_portfolio
POSTGRES_SSL=false
```

If your password includes symbols like `@`, `#`, `/`, `?`, or `:`, URL-encode the password before putting it in `DATABASE_URL`.

## Required Environment Variables

- `DATABASE_URL`: PostgreSQL connection string.
- `ADMIN_EMAIL`: 
- `ADMIN_PASSWORD`: 
- `SESSION_SECRET`: 
- `POSTGRES_SSL`: set to `true` for hosted Postgres providers such as Neon, Render, or Railway.

## Deployment

Use a host that can run a Node server and attach PostgreSQL, such as Render, Railway, Fly.io, or a VPS.

Build command:

```bash
npm install && npm run build
```

Start command:

```bash
npm start
```

Add the environment variables above in your hosting dashboard. Connect the host to your GitHub repository and enable auto-deploys from the main branch. After that, pushing to GitHub rebuilds and restarts the live site.

## Database

The server auto-creates the needed tables on startup. The SQL is also available in `server/schema.sql`.

The editable portfolio content is stored as JSONB in PostgreSQL and streamed to open pages with Server-Sent Events after admin saves.
