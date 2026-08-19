import { NextResponse } from "next/server";
import { registerSchema } from "@football-hub/contracts";
import { writeAuthCookies } from "@/lib/auth/cookies";
import { requestTokens } from "@/lib/auth/expressApi";

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const input = registerSchema.safeParse(body);

  if (!input.success) {
    return NextResponse.json(
      { message: input.error.issues[0]?.message ?? "Некорректные данные" },
      { status: 400 },
    );
  }

  const result = await requestTokens("/auth/register", input.data);

  if (!result.ok) {
    return NextResponse.json(
      { message: result.message },
      { status: result.status },
    );
  }

  const response = NextResponse.json({ user: result.data.user }, { status: 201 });

  writeAuthCookies(response.cookies, result.data);

  return response;
}
