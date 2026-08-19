import { NextResponse } from "next/server";
import { credentialsSchema } from "@football-hub/contracts";
import { writeAuthCookies } from "@/lib/auth/cookies";
import { requestTokens } from "@/lib/auth/expressApi";

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const input = credentialsSchema.safeParse(body);

  if (!input.success) {
    return NextResponse.json({ message: "Некорректные данные" }, { status: 400 });
  }

  const result = await requestTokens("/auth/login", input.data);

  if (!result.ok) {
    return NextResponse.json(
      { message: result.message },
      { status: result.status },
    );
  }

  const response = NextResponse.json({ user: result.data.user });

  writeAuthCookies(response.cookies, result.data);

  return response;
}
