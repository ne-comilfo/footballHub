import type { Request, Response } from "express";

type IdRequest = Request<{ id: string }>;
import { z } from "zod";
import {
  paginatedSchema,
  squadPlayerSchema,
  teamCardSchema,
  teamFixtureSchema,
  teamSchema,
  teamStatsSchema,
  teamsQuerySchema,
} from "@football-hub/contracts";

import { HttpError } from "../middleware/errorHandler";
import {
  getPopularTeams,
  getTeam,
  getTeamFixtures,
  getTeamSquad,
  getTeamStats,
  listTeams,
} from "../services/teamsService";
import { parseInput } from "../utils/parse";
import { send } from "../utils/respond";

export async function list(request: Request, response: Response) {
  const query = parseInput(teamsQuerySchema, request.query);

  send(response, paginatedSchema(teamCardSchema), await listTeams(query));
}

export async function popular(_request: Request, response: Response) {
  send(response, z.array(teamCardSchema), await getPopularTeams());
}

export async function detail(request: IdRequest, response: Response) {
  const team = await getTeam(request.params.id);

  if (!team) {
    throw new HttpError(404, "Команда не найдена");
  }

  send(response, teamSchema, team);
}

export async function squad(request: IdRequest, response: Response) {
  send(
    response,
    z.array(squadPlayerSchema),
    await getTeamSquad(request.params.id),
  );
}

export async function stats(request: IdRequest, response: Response) {
  send(
    response,
    teamStatsSchema.nullable(),
    await getTeamStats(request.params.id),
  );
}

export async function fixtures(request: IdRequest, response: Response) {
  send(
    response,
    z.array(teamFixtureSchema),
    await getTeamFixtures(request.params.id),
  );
}
