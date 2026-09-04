import type { Request, Response } from "express";
import { matchSchema, matchesBoardSchema } from "@football-hub/contracts";

import { getMatchOfTheDay, getMatchesBoard } from "../services/matchesService";
import { send } from "../utils/respond";

export async function day(request: Request, response: Response) {
  const date = typeof request.query.date === "string" ? request.query.date : "";

  send(response, matchSchema.nullable(), await getMatchOfTheDay(date));
}

export async function board(_request: Request, response: Response) {
  send(response, matchesBoardSchema, await getMatchesBoard());
}
