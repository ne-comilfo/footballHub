import type { NextFunction, Request, Response } from "express";
import { HttpError } from "./errorHandler";
import { readAccessToken } from "../utils/tokens";

export function requireAuth(
  request: Request,
  _response: Response,
  next: NextFunction,
) {
  const header = request.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    throw new HttpError(401, "Требуется авторизация");
  }

  const userId = readAccessToken(header.slice("Bearer ".length).trim());

  if (!userId) {
    throw new HttpError(401, "Токен недействителен или истёк");
  }

  request.userId = userId;
  next();
}
