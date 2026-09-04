import { Router } from "express";
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
import { send } from "../utils/respond";

const router = Router();

router.get("/popular", async (_request, response) => {
  send(response, z.array(playerCardSchema), await getPopularPlayers());
});

router.get("/", async (request, response) => {
  const query = playersQuerySchema.parse(request.query);

  send(response, paginatedSchema(playerCardSchema), await listPlayers(query));
});

router.get("/:id", async (request, response) => {
  const player = await getPlayer(request.params.id);

  if (!player) {
    throw new HttpError(404, "Игрок не найден");
  }

  send(response, playerSchema, player);
});

export default router;
