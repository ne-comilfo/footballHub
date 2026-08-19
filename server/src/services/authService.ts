import type { AuthTokens, Credentials, RegisterInput, User } from "@football-hub/contracts";
import type { User as UserRecord } from "@prisma/client";
import { randomUUID } from "node:crypto";

import { prisma } from "../config/prisma";
import { HttpError } from "../middleware/errorHandler";
import { hashPassword, verifyPassword } from "../utils/password";
import {
  createRefreshToken,
  hashRefreshToken,
  signAccessToken,
} from "../utils/tokens";

const INVALID_CREDENTIALS = "Неверная почта или пароль";

export function toUser(record: UserRecord): User {
  return {
    id: record.id,
    email: record.email,
    nickname: record.nickname,
    createdAt: record.createdAt.toISOString(),
  };
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

async function issueTokens(user: UserRecord): Promise<AuthTokens> {
  const profile = toUser(user);
  const refresh = createRefreshToken();

  await prisma.refreshToken.create({
    data: {
      tokenHash: refresh.tokenHash,
      expiresAt: refresh.expiresAt,
      userId: user.id,
    },
  });

  return {
    user: profile,
    accessToken: signAccessToken(profile),
    refreshToken: refresh.token,
    refreshExpiresAt: refresh.expiresAt.toISOString(),
  };
}

export async function register(input: RegisterInput): Promise<AuthTokens> {
  const email = normalizeEmail(input.email);
  const nickname = input.nickname.trim();

  const existing = await prisma.user.findFirst({
    where: { OR: [{ email }, { nickname }] },
    select: { email: true, nickname: true },
  });

  if (existing?.email === email) {
    throw new HttpError(409, "Пользователь с такой почтой уже зарегистрирован");
  }

  if (existing) {
    throw new HttpError(409, "Такой никнейм уже занят");
  }

  const user = await prisma.user.create({
    data: { email, nickname, password: await hashPassword(input.password) },
  });

  return issueTokens(user);
}

export async function login(input: Credentials): Promise<AuthTokens> {
  const email = normalizeEmail(input.email);
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    await hashPassword(input.password);
    throw new HttpError(401, INVALID_CREDENTIALS);
  }

  if (!(await verifyPassword(input.password, user.password))) {
    throw new HttpError(401, INVALID_CREDENTIALS);
  }

  return issueTokens(user);
}

export async function refresh(token: string): Promise<AuthTokens> {
  const tokenHash = hashRefreshToken(token);
  const stored = await prisma.refreshToken.findUnique({
    where: { tokenHash },
    include: { user: true },
  });

  if (!stored) {
    throw new HttpError(401, "Сессия недействительна");
  }

  if (stored.revokedAt) {
    await prisma.refreshToken.updateMany({
      where: { userId: stored.userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });

    throw new HttpError(401, "Сессия недействительна");
  }

  if (stored.expiresAt.getTime() <= Date.now()) {
    throw new HttpError(401, "Сессия истекла");
  }

  const next = createRefreshToken();
  const nextId = randomUUID();

  await prisma.$transaction([
    prisma.refreshToken.create({
      data: {
        id: nextId,
        tokenHash: next.tokenHash,
        expiresAt: next.expiresAt,
        userId: stored.userId,
      },
    }),
    prisma.refreshToken.update({
      where: { id: stored.id },
      data: { revokedAt: new Date(), replacedById: nextId },
    }),
  ]);

  return {
    user: toUser(stored.user),
    accessToken: signAccessToken(toUser(stored.user)),
    refreshToken: next.token,
    refreshExpiresAt: next.expiresAt.toISOString(),
  };
}

export async function logout(token: string): Promise<void> {
  await prisma.refreshToken.updateMany({
    where: { tokenHash: hashRefreshToken(token), revokedAt: null },
    data: { revokedAt: new Date() },
  });
}

export async function getUserById(id: string): Promise<User | null> {
  const user = await prisma.user.findUnique({ where: { id } });

  return user ? toUser(user) : null;
}
