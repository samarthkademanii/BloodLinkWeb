# Deploying the BloodLink website

This is a React + TypeScript app (built with Vite) that talks to the same
[BloodLinkBackend](https://github.com/samarthkademanii/BloodLinkBackend) API
the mobile app uses.

## Local development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173` with hot reload. By default it talks to the
deployed backend — copy `.env.example` to `.env` and set `VITE_API_URL` if you
want to point it at a backend running locally instead.

## Deploy on Render (free, same account as the backend)

1. In the Render dashboard, click **New → Blueprint**
2. Select the `BloodLinkWeb` repo
3. Render reads `render.yaml` automatically — it runs `npm install && npm run
   build` and publishes the `dist/` folder. Click **Apply**.
4. You'll get a public URL in a minute or two, e.g.
   `https://bloodlink-web.onrender.com`

Static sites don't sleep like the backend's free web service does, so there's
no cold-start delay for the page itself (only the first API call to the
backend might be slow if it's been idle).

## If you move the backend

The backend's URL is set near the top of `src/data/api.ts`:

```ts
export const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'https://bloodlink-backend-7ln9.onrender.com/api';
```

Update the fallback URL there if the backend ever gets redeployed elsewhere,
or set `VITE_API_URL` as an environment variable on Render instead.

## Project structure

```
src/
  data/       types, mock/offline-fallback data, API client, polling hook
  theme/      light/dark toggle (persisted to localStorage)
  components/ shared UI (Nav, Ticker, HospitalMap, small building blocks)
  sections/   one file per tab (Dashboard, FindBlood, Donate, Hospitals, Alerts)
```
