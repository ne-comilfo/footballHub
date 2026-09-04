import { serverEnv } from "@/lib/env";

const SPORTSDB_KEY = "123";
const SPORTSDB_PLAYER_KEY = "3";

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);

  if (!response.ok) {
    throw new Error(`Внешний API ответил ${response.status}: ${url}`);
  }

  return (await response.json()) as T;
}

const REFERENCE_TTL = 600;
const LIVE_TTL = 30;

export function sportsDb<T>(
  path: string,
  { key = SPORTSDB_KEY, revalidate = REFERENCE_TTL } = {},
) {
  return request<T>(`${serverEnv.theSportsDbBaseUrl}/${key}${path}`, {
    next: { revalidate },
  });
}

export function sportsDbLive<T>(path: string) {
  return sportsDb<T>(path, { revalidate: LIVE_TTL });
}

export function sportsDbPlayer<T>(path: string) {
  return sportsDb<T>(path, { key: SPORTSDB_PLAYER_KEY });
}

export function apiFootball<T>(path: string) {
  return request<T>(`${serverEnv.apiFootballBaseUrl}${path}`, {
    headers: { "x-apisports-key": serverEnv.apiFootballKey },
    next: { revalidate: 3600 },
  });
}
