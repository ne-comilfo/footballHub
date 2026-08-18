import { z } from "zod";
import { serverEnv } from "@/lib/env";
import { ApiError, apiFetch, buildQuery } from "@/lib/http";
import {
  paginatedSchema,
  matchSchema,
  matchesBoardSchema,
  playerCardSchema,
  playerSchema,
  type PlayersQuery,
  squadPlayerSchema,
  teamCardSchema,
  teamFixtureSchema,
  teamSchema,
  teamStatsSchema,
  type TeamsQuery,
} from "@football-hub/contracts";
import type { FootballDataProvider } from "../provider";

function get<S extends z.ZodType>(path: string, schema: S) {
  return apiFetch(`${serverEnv.ownApiUrl}${path}`, schema);
}

async function getOrNull<S extends z.ZodType>(path: string, schema: S) {
  try {
    return await get(path, schema.nullable());
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
}

export const ownProvider: FootballDataProvider = {
  listTeams(query: TeamsQuery) {
    return get(
      `/teams${buildQuery({ ...query })}`,
      paginatedSchema(teamCardSchema),
    );
  },

  getPopularTeams() {
    return get("/teams/popular", z.array(teamCardSchema));
  },

  getTeam(id: string) {
    return getOrNull(`/teams/${id}`, teamSchema);
  },

  getTeamSquad(id: string) {
    return get(`/teams/${id}/squad`, z.array(squadPlayerSchema));
  },

  getTeamStats(id: string) {
    return getOrNull(`/teams/${id}/stats`, teamStatsSchema);
  },

  getTeamFixtures(id: string) {
    return get(`/teams/${id}/fixtures`, z.array(teamFixtureSchema));
  },

  listPlayers(query: PlayersQuery) {
    return get(
      `/players${buildQuery({ ...query })}`,
      paginatedSchema(playerCardSchema),
    );
  },

  getPopularPlayers() {
    return get("/players/popular", z.array(playerCardSchema));
  },

  getPlayer(id: string) {
    return getOrNull(`/players/${id}`, playerSchema);
  },

  getMatchOfTheDay(date: string) {
    return getOrNull(`/matches/day${buildQuery({ date })}`, matchSchema);
  },

  getMatchesBoard() {
    return get("/matches/board", matchesBoardSchema);
  },
};
