import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ACCESS_COOKIE } from "@/lib/auth/constants";
import { readAccessToken } from "@/lib/auth/token";

export async function GET() {
  const store = await cookies();
  const user = await readAccessToken(store.get(ACCESS_COOKIE)?.value);

  return NextResponse.json({ user });
}
