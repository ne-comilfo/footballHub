import { z } from "zod";
import { apiFetch, buildQuery } from "@/lib/http";
import {
  paginatedSchema,
  playerCardSchema,
  playerSchema,
  topScorerSchema,
  type PlayersQuery,
} from "@football-hub/contracts";

export function getPlayers(query: PlayersQuery) {
  return apiFetch(
    `/api/players${buildQuery({ ...query })}`,
    paginatedSchema(playerCardSchema),
  );
}

export function getPopularPlayers() {
  return apiFetch("/api/players/popular", z.array(playerCardSchema));
}

export function getPlayer(id: string) {
  return apiFetch(`/api/players/${id}`, playerSchema);
}

export function getTopScorers() {
  return apiFetch("/api/players/top-scorers", z.array(topScorerSchema));
}
