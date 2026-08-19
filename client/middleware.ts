import { NextResponse, type NextRequest } from "next/server";
import { ACCESS_COOKIE, REFRESH_COOKIE } from "@/lib/auth/constants";
import { clearAuthCookies, writeAuthCookies } from "@/lib/auth/cookies";
import { requestTokens } from "@/lib/auth/expressApi";
import { readAccessToken } from "@/lib/auth/token";

const PROTECTED = ["/lk"];

function isProtected(pathname: string) {
  return PROTECTED.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await readAccessToken(request.cookies.get(ACCESS_COOKIE)?.value);

  if (user) {
    return NextResponse.next();
  }

  const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value;

  if (!refreshToken) {
    return isProtected(pathname)
      ? NextResponse.redirect(new URL("/auth", request.url))
      : NextResponse.next();
  }

  const result = await requestTokens("/auth/refresh", { refreshToken });

  if (!result.ok) {
    const response = isProtected(pathname)
      ? NextResponse.redirect(new URL("/auth", request.url))
      : NextResponse.next();

    clearAuthCookies(response.cookies);

    return response;
  }

  request.cookies.set(ACCESS_COOKIE, result.data.accessToken);
  request.cookies.set(REFRESH_COOKIE, result.data.refreshToken);

  const response = NextResponse.next({ request });

  writeAuthCookies(response.cookies, result.data);

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
