import { jwtVerify } from "jose";
import { userSchema, type User } from "@football-hub/contracts";
import { serverEnv } from "@/lib/env";

let cachedKey: Uint8Array | null = null;

function secretKey() {
  cachedKey ??= new TextEncoder().encode(serverEnv.jwtSecret);

  return cachedKey;
}

export async function readAccessToken(
  token: string | undefined,
): Promise<User | null> {
  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, secretKey(), {
      algorithms: ["HS256"],
    });

    const parsed = userSchema.safeParse({
      id: payload.sub,
      email: payload.email,
      nickname: payload.nickname,
      createdAt: payload.createdAt,
    });

    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}
