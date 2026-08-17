import { z } from "zod";
import { apiFetch, buildQuery } from "@/lib/http";
import { paginatedSchema } from "@/contracts/common";
import {
  playerCardSchema,
  playerSchema,
  type PlayersQuery,
} from "@/contracts/player";

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
