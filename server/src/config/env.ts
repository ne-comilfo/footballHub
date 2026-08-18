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
