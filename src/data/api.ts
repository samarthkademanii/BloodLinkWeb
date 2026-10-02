// Points the site at the BloodLink backend. Set VITE_API_URL in a .env file
// to override (see .env.example); falls back to the deployed backend so the
// site still works out of the box with no setup.
export const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'https://bloodlink-backend-7ln9.onrender.com/api';

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
  return res.json() as Promise<T>;
}
