import type { Response } from "express";
import type { z } from "zod";

import { env } from "../config/env";

export function send<S extends z.ZodType>(
  response: Response,
  schema: S,
  data: unknown,
  status = 200,
) {
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    console.error("[contract]", parsed.error.issues);

    response.status(500).json({
      message:
        env.NODE_ENV === "development"
          ? `Ответ не соответствует контракту: ${parsed.error.issues[0]?.path.join(".")} ${parsed.error.issues[0]?.message}`
          : "Внутренняя ошибка сервера",
    });

    return;
  }

  response.status(status).json(parsed.data);
}
