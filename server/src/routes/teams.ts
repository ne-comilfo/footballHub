import { Router } from "express";
import { z } from "zod";
import {
  paginatedSchema,
  squadPlayerSchema,
  teamCardSchema,
  teamSchema,
  teamStatsSchema,
  teamFixtureSchema,
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
import { send } from "../utils/respond";

const router = Router();

router.get("/popular", async (_request, response) => {
  send(response, z.array(teamCardSchema), await getPopularTeams());
});

router.get("/", async (request, response) => {
  const query = teamsQuerySchema.parse(request.query);

  send(response, paginatedSchema(teamCardSchema), await listTeams(query));
});

router.get("/:id", async (request, response) => {
  const team = await getTeam(request.params.id);

  if (!team) {
    throw new HttpError(404, "Команда не найдена");
  }

  send(response, teamSchema, team);
});

router.get("/:id/squad", async (request, response) => {
  send(
    response,
    z.array(squadPlayerSchema),
    await getTeamSquad(request.params.id),
  );
});

router.get("/:id/stats", async (request, response) => {
  send(
    response,
    teamStatsSchema.nullable(),
    await getTeamStats(request.params.id),
  );
});

router.get("/:id/fixtures", async (request, response) => {
  send(
    response,
    z.array(teamFixtureSchema),
    await getTeamFixtures(request.params.id),
  );
});

export default router;
