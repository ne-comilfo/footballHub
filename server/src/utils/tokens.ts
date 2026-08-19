import { createHash, randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";
import type { User } from "@football-hub/contracts";
import { env } from "../config/env";

const ALGORITHM = "HS256";

export function signAccessToken(user: User): string {
  return jwt.sign(
    {
      email: user.email,
      nickname: user.nickname,
      createdAt: user.createdAt,
    },
    env.JWT_SECRET,
    {
      subject: user.id,
      algorithm: ALGORITHM,
      expiresIn: env.ACCESS_TOKEN_TTL_SECONDS,
    },
  );
}

export function readAccessToken(token: string): string | null {
  try {
    const payload = jwt.verify(token, env.JWT_SECRET, {
      algorithms: [ALGORITHM],
    });

    if (typeof payload === "string" || typeof payload.sub !== "string") {
      return null;
    }

    return payload.sub;
  } catch {
    return null;
  }
}

export function hashRefreshToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function createRefreshToken() {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(
    Date.now() + env.REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000,
  );

  return { token, tokenHash: hashRefreshToken(token), expiresAt };
}
