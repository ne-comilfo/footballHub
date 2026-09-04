import type { Request, Response } from "express";
import { credentialsSchema, registerSchema } from "@football-hub/contracts";

import { HttpError } from "../middleware/errorHandler";
import {
  getUserById,
  login,
  logout,
  refresh,
  register,
} from "../services/authService";
import { parseInput } from "../utils/parse";

function readRefreshToken(request: Request) {
  const token = (request.body as { refreshToken?: unknown } | undefined)
    ?.refreshToken;

  return typeof token === "string" && token ? token : null;
}

export async function registerUser(request: Request, response: Response) {
  const input = parseInput(registerSchema, request.body);

  response.status(201).json(await register(input));
}

export async function loginUser(request: Request, response: Response) {
  const input = parseInput(credentialsSchema, request.body);

  response.json(await login(input));
}

export async function refreshSession(request: Request, response: Response) {
  const token = readRefreshToken(request);

  if (!token) {
    throw new HttpError(401, "Сессия недействительна");
  }

  response.json(await refresh(token));
}

export async function logoutUser(request: Request, response: Response) {
  const token = readRefreshToken(request);

  if (token) {
    await logout(token);
  }

  response.status(204).end();
}

export async function me(request: Request, response: Response) {
  const user = await getUserById(request.userId!);

  if (!user) {
    throw new HttpError(401, "Пользователь не найден");
  }

  response.json({ user });
}
