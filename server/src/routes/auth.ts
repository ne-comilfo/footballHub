import { Router } from "express";
import type { z } from "zod";
import { credentialsSchema, registerSchema } from "@football-hub/contracts";

import { HttpError } from "../middleware/errorHandler";
import { loginRateLimit, registerRateLimit } from "../middleware/rateLimit";
import { requireAuth } from "../middleware/requireAuth";
import {
  getUserById,
  login,
  logout,
  refresh,
  register,
} from "../services/authService";

const router = Router();

function parse<S extends z.ZodType>(schema: S, body: unknown): z.infer<S> {
  const result = schema.safeParse(body);

  if (!result.success) {
    const issue = result.error.issues[0];
    const field = issue?.path[0];

    throw new HttpError(
      400,
      issue
        ? `${field ? `${String(field)}: ` : ""}${issue.message}`
        : "Некорректные данные",
    );
  }

  return result.data;
}

router.post("/register", registerRateLimit, async (request, response) => {
  const input = parse(registerSchema, request.body);

  response.status(201).json(await register(input));
});

router.post("/login", loginRateLimit, async (request, response) => {
  const input = parse(credentialsSchema, request.body);

  response.json(await login(input));
});

router.post("/refresh", async (request, response) => {
  const token = (request.body as { refreshToken?: unknown } | undefined)
    ?.refreshToken;

  if (typeof token !== "string" || !token) {
    throw new HttpError(401, "Сессия недействительна");
  }

  response.json(await refresh(token));
});

router.post("/logout", async (request, response) => {
  const token = (request.body as { refreshToken?: unknown } | undefined)
    ?.refreshToken;

  if (typeof token === "string" && token) {
    await logout(token);
  }

  response.status(204).end();
});

router.get("/me", requireAuth, async (request, response) => {
  const user = await getUserById(request.userId!);

  if (!user) {
    throw new HttpError(401, "Пользователь не найден");
  }

  response.json({ user });
});

export default router;
