import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { serverEnv } from "@/lib/env";
import { ACCESS_COOKIE } from "./constants";

export async function proxyToOwnApi(path: string, init?: RequestInit) {
  const store = await cookies();
  const token = store.get(ACCESS_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({ message: "Требуется вход" }, { status: 401 });
  }

  let response: Response;

  try {
    response = await fetch(`${serverEnv.ownApiUrl}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...init?.headers,
      },
      cache: "no-store",
    });
  } catch {
    return NextResponse.json({ message: "Сервер недоступен" }, { status: 502 });
  }

  const payload: unknown = await response.json().catch(() => null);

  return NextResponse.json(payload ?? {}, { status: response.status });
}
