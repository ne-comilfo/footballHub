import rateLimit from "express-rate-limit";
import { env } from "../config/env";

const windowMs = env.LOGIN_ATTEMPTS_WINDOW_MINUTES * 60 * 1000;

function emailKey(body: unknown, fallback: string) {
  if (body && typeof body === "object" && "email" in body) {
    const email = (body as { email?: unknown }).email;

    if (typeof email === "string" && email.trim()) {
      return email.trim().toLowerCase();
    }
  }

  return fallback;
}

export const loginRateLimit = rateLimit({
  windowMs,
  limit: env.LOGIN_ATTEMPTS_LIMIT,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  keyGenerator: (request) => `login:${emailKey(request.body, request.ip ?? "")}`,
  message: {
    message: `Слишком много попыток входа. Попробуйте через ${env.LOGIN_ATTEMPTS_WINDOW_MINUTES} минут`,
  },
});

export const registerRateLimit = rateLimit({
  windowMs,
  limit: env.LOGIN_ATTEMPTS_LIMIT,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  keyGenerator: (request) =>
    `register:${emailKey(request.body, request.ip ?? "")}`,
  message: {
    message: "Слишком много попыток регистрации. Попробуйте позже",
  },
});
