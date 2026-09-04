import type { z } from "zod";

import { HttpError } from "../middleware/errorHandler";

export function parseInput<S extends z.ZodType>(
  schema: S,
  value: unknown,
): z.infer<S> {
  const result = schema.safeParse(value);

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
