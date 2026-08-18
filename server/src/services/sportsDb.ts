import { env } from "../config/env";

const KEY = "123";
const PLAYER_KEY = "3";

async function request<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`TheSportsDB ответил ${response.status}: ${url}`);
  }

  return (await response.json()) as T;
}

export function sportsDb<T>(path: string, key = KEY) {
  return request<T>(`${env.THE_SPORTS_DB_BASE_URL.replace(/\/+$/, "")}/${key}${path}`);
}

export function sportsDbPlayer<T>(path: string) {
  return sportsDb<T>(path, PLAYER_KEY);
}
