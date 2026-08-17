import { NextResponse } from "next/server";

export async function jsonRoute<T>(load: () => Promise<T>) {
  try {
    return NextResponse.json(await load());
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Внутренняя ошибка сервера";

    console.error("[api]", message, error);

    return NextResponse.json({ message }, { status: 502 });
  }
}

export function notFound(message: string) {
  return NextResponse.json({ message }, { status: 404 });
}
