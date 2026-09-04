import type { Request, Response } from "express";

type IdRequest = Request<{ id: string }>;
import { z } from "zod";
import {
  paginatedSchema,
  playerCardSchema,
  playerSchema,
  playersQuerySchema,
} from "@football-hub/contracts";

import { HttpError } from "../middleware/errorHandler";
import {
  getPlayer,
  getPopularPlayers,
  listPlayers,
} from "../services/playersService";
import { parseInput } from "../utils/parse";
import { send } from "../utils/respond";

export async function list(request: Request, response: Response) {
  const query = parseInput(playersQuerySchema, request.query);

  send(response, paginatedSchema(playerCardSchema), await listPlayers(query));
}

export async function popular(_request: Request, response: Response) {
  send(response, z.array(playerCardSchema), await getPopularPlayers());
}

export async function detail(request: IdRequest, response: Response) {
  const player = await getPlayer(request.params.id);

  if (!player) {
    throw new HttpError(404, "Игрок не найден");
  }

  send(response, playerSchema, player);
}
