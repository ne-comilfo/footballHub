import { env } from "../config/env";

export class QuotaExhausted extends Error {
  constructor(message: string) {
    super(message);
    this.name = "QuotaExhausted";
  }
}

const RESERVE = 2;
const MIN_DELAY_MS = 300;
const MINUTE_MS = 61_000;

const state = {
  dailyLimit: null as number | null,
  dailyRemaining: null as number | null,
  minuteRemaining: null as number | null,
  spent: 0,
};

export const quota = {
  get dailyLimit() {
    return state.dailyLimit;
  },
  get dailyRemaining() {
    return state.dailyRemaining;
  },
  get spent() {
    return state.spent;
  },
  canSpend(count: number) {
    return (
      state.dailyRemaining === null || state.dailyRemaining - count >= RESERVE
    );
  },
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function toNumber(value: string | null) {
  if (value === null) {
    return null;
  }

  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : null;
}

function readHeaders(headers: Headers) {
  state.dailyLimit =
    toNumber(headers.get("x-ratelimit-requests-limit")) ?? state.dailyLimit;
  state.dailyRemaining =
    toNumber(headers.get("x-ratelimit-requests-remaining")) ??
    state.dailyRemaining;
  state.minuteRemaining = toNumber(headers.get("x-ratelimit-remaining"));
}

export async function apiFootball<T>(path: string): Promise<T> {
  if (!env.API_FOOTBALL_KEY) {
    throw new Error("Не задан API_FOOTBALL_KEY в server/.env");
  }

  if (!quota.canSpend(1)) {
    throw new QuotaExhausted(
      `дневная квота исчерпана, осталось ${state.dailyRemaining}`,
    );
  }

  if (state.minuteRemaining !== null && state.minuteRemaining <= 0) {
    await sleep(MINUTE_MS);
  }

  const response = await fetch(
    `${env.API_FOOTBALL_BASE_URL.replace(/\/+$/, "")}${path}`,
    { headers: { "x-apisports-key": env.API_FOOTBALL_KEY } },
  );

  readHeaders(response.headers);
  state.spent++;

  if (response.status === 429) {
    throw new QuotaExhausted("API-Football ответил 429");
  }

  if (!response.ok) {
    throw new Error(`API-Football ответил ${response.status}: ${path}`);
  }

  const payload = (await response.json()) as {
    response?: unknown;
    errors?: unknown;
  };

  const errors = payload.errors;

  if (errors && !Array.isArray(errors) && Object.keys(errors).length > 0) {
    const text = Object.values(errors as Record<string, string>).join("; ");

    if (/limit|quota|plan|subscription/i.test(text)) {
      throw new QuotaExhausted(text);
    }

    throw new Error(`API-Football: ${text}`);
  }

  await sleep(MIN_DELAY_MS);

  return payload as T;
}
