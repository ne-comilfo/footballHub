import type { z } from "zod";

export class ApiError extends Error {
  readonly status: number;
  readonly details?: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

function resolveUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  if (typeof window !== "undefined") {
    return path;
  }

  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ??
    `http://localhost:${process.env.PORT ?? 3000}`;

  return new URL(path, base).toString();
}

export async function apiFetch<S extends z.ZodType>(
  path: string,
  schema: S,
  init?: RequestInit,
): Promise<z.infer<S>> {
  let response: Response;

  try {
    response = await fetch(resolveUrl(path), {
      ...init,
      headers: { Accept: "application/json", ...init?.headers },
    });
  } catch (cause) {
    throw new ApiError(0, "Сервер недоступен, проверь соединение", cause);
  }

  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      payload &&
      typeof payload === "object" &&
      "message" in payload &&
      typeof payload.message === "string"
        ? payload.message
        : `Запрос ${path} завершился с ошибкой ${response.status}`;

    throw new ApiError(response.status, message, payload);
  }

  const parsed = schema.safeParse(payload);

  if (!parsed.success) {
    throw new ApiError(
      response.status,
      `Ответ ${path} не соответствует контракту`,
      parsed.error.issues,
    );
  }

  return parsed.data;
}

export function buildQuery(
  params: Record<string, string | number | undefined>,
) {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === "") {
      continue;
    }

    search.set(key, String(value));
  }

  const query = search.toString();

  return query ? `?${query}` : "";
}
