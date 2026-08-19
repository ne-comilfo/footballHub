import type { AuthTokens } from "@football-hub/contracts";
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  REFRESH_COOKIE_PATH,
} from "./constants";

type CookieWriter = {
  set: (options: {
    name: string;
    value: string;
    httpOnly: boolean;
    sameSite: "lax";
    secure: boolean;
    path: string;
    expires?: Date;
    maxAge?: number;
  }) => void;
};

const isProduction = process.env.NODE_ENV === "production";

export function writeAuthCookies(store: CookieWriter, tokens: AuthTokens) {
  store.set({
    name: ACCESS_COOKIE,
    value: tokens.accessToken,
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction,
    path: "/",
  });

  store.set({
    name: REFRESH_COOKIE,
    value: tokens.refreshToken,
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction,
    path: REFRESH_COOKIE_PATH,
    expires: new Date(tokens.refreshExpiresAt),
  });
}

export function clearAuthCookies(store: CookieWriter) {
  store.set({
    name: ACCESS_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction,
    path: "/",
    maxAge: 0,
  });

  store.set({
    name: REFRESH_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction,
    path: REFRESH_COOKIE_PATH,
    maxAge: 0,
  });
}
