export type DataSource = "external" | "own";

function required(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(
      `Не задана переменная окружения ${name}. Проверь client/.env.local`,
    );
  }

  return value;
}

export const serverEnv = {
  get dataSource(): DataSource {
    return process.env.DATA_SOURCE === "own" ? "own" : "external";
  },

  get ownApiUrl(): string {
    return required("OWN_API_URL").replace(/\/+$/, "");
  },

  get apiFootballBaseUrl(): string {
    return required("API_FOOTBALL_BASE_URL").replace(/\/+$/, "");
  },

  get apiFootballKey(): string {
    return required("API_FOOTBALL_KEY");
  },

  get theSportsDbBaseUrl(): string {
    return required("THE_SPORTS_DB_BASE_URL").replace(/\/+$/, "");
  },

  get season(): string {
    return process.env.FOOTBALL_SEASON?.trim() || "2024";
  },

  get jwtSecret(): string {
    return required("JWT_SECRET");
  },
} as const;
