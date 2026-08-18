import { z } from "zod";
import { apiFetch, buildQuery } from "@/lib/http";
import {
  paginatedSchema,
  squadPlayerSchema,
  teamCardSchema,
  teamFixtureSchema,
  teamSchema,
  teamStatsSchema,
  type TeamsQuery,
} from "@football-hub/contracts";

export function getTeams(query: TeamsQuery) {
  return apiFetch(
    `/api/teams${buildQuery({ ...query })}`,
    paginatedSchema(teamCardSchema),
  );
}

export function getPopularTeams() {
  return apiFetch("/api/teams/popular", z.array(teamCardSchema));
}

export function getTeam(id: string) {
  return apiFetch(`/api/teams/${id}`, teamSchema);
}

export function getTeamSquad(id: string) {
  return apiFetch(`/api/teams/${id}/squad`, z.array(squadPlayerSchema));
}

export function getTeamStats(id: string) {
  return apiFetch(`/api/teams/${id}/stats`, teamStatsSchema.nullable());
}

export function getTeamFixtures(id: string) {
  return apiFetch(`/api/teams/${id}/fixtures`, z.array(teamFixtureSchema));
}
