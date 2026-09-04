import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL не задан"),
  PORT: z.coerce.number().int().positive().default(5000),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  THE_SPORTS_DB_BASE_URL: z
    .string()
    .default("https://www.thesportsdb.com/api/v1/json"),
  JWT_SECRET: z
    .string()
    .min(32, "JWT_SECRET должен быть длиной не меньше 32 символов"),
  ACCESS_TOKEN_TTL_SECONDS: z.coerce.number().int().positive().default(900),
  REFRESH_TOKEN_TTL_DAYS: z.coerce.number().int().positive().default(30),
  LOGIN_ATTEMPTS_LIMIT: z.coerce.number().int().positive().default(5),
  LOGIN_ATTEMPTS_WINDOW_MINUTES: z.coerce.number().int().positive().default(15),
  API_FOOTBALL_BASE_URL: z
    .string()
    .default("https://v3.football.api-sports.io"),
  API_FOOTBALL_KEY: z.string().default(""),
  FOOTBALL_SEASON: z.coerce.number().int().default(2024),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Неверные переменные окружения в server/.env:");
  for (const issue of parsed.error.issues) {
    console.error(`  ${issue.path.join(".")}: ${issue.message}`);
  }
  process.exit(1);
}

export const env = parsed.data;
