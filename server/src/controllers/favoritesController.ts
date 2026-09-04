import type { Request, Response } from "express";
import {
  favoriteInputSchema,
  favoritesSchema,
  supportedFavoriteKindSchema,
} from "@football-hub/contracts";

import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../services/favoritesService";
import { parseInput } from "../utils/parse";
import { send } from "../utils/respond";

type RemoveRequest = Request<{ kind: string; entityId: string }>;

export async function list(request: Request, response: Response) {
  send(response, favoritesSchema, await getFavorites(request.userId!));
}

export async function add(request: Request, response: Response) {
  const input = parseInput(favoriteInputSchema, request.body);

  await addFavorite(request.userId!, input);

  send(response, favoritesSchema, await getFavorites(request.userId!), 201);
}

export async function remove(request: RemoveRequest, response: Response) {
  const kind = parseInput(supportedFavoriteKindSchema, request.params.kind);

  await removeFavorite(request.userId!, kind, request.params.entityId);

  send(response, favoritesSchema, await getFavorites(request.userId!));
}
