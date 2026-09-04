import { Router } from "express";
import { matchSchema, matchesBoardSchema } from "@football-hub/contracts";

import { getMatchOfTheDay, getMatchesBoard } from "../services/matchesService";
import { send } from "../utils/respond";

const router = Router();

router.get("/day", async (request, response) => {
  const date = typeof request.query.date === "string" ? request.query.date : "";

  send(response, matchSchema.nullable(), await getMatchOfTheDay(date));
});

router.get("/board", async (_request, response) => {
  send(response, matchesBoardSchema, await getMatchesBoard());
});

export default router;
