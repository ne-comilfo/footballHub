import { authTokensSchema, type AuthTokens } from "@football-hub/contracts";
import { serverEnv } from "@/lib/env";

export type ExpressResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; message: string };

async function call(path: string, body: unknown) {
  const response = await fetch(`${serverEnv.ownApiUrl}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const payload: unknown = await response.json().catch(() => null);

  return { response, payload };
}

function message(payload: unknown, fallback: string) {
  return payload &&
    typeof payload === "object" &&
    "message" in payload &&
    typeof payload.message === "string"
    ? payload.message
    : fallback;
}

export async function requestTokens(
  path: string,
  body: unknown,
): Promise<ExpressResult<AuthTokens>> {
  let response: Response;
  let payload: unknown;

  try {
    ({ response, payload } = await call(path, body));
  } catch {
    return { ok: false, status: 502, message: "Сервер авторизации недоступен" };
  }

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      message: message(payload, "Не удалось выполнить запрос"),
    };
  }

  const parsed = authTokensSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      ok: false,
      status: 502,
      message: "Сервер авторизации вернул неожиданный ответ",
    };
  }

  return { ok: true, data: parsed.data };
}

export async function revokeRefreshToken(refreshToken: string) {
  try {
    await call("/auth/logout", { refreshToken });
  } catch {
    // выход должен срабатывать даже если сервер недоступен
  }
}
