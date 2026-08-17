import { apiFetch, buildQuery } from "@/lib/http";
import { matchSchema, matchesBoardSchema } from "@/contracts/match";

export function getMatchOfTheDay(date: string) {
  return apiFetch(
    `/api/matches/day${buildQuery({ date })}`,
    matchSchema.nullable(),
  );
}

export function getMatchesBoard() {
  return apiFetch("/api/matches/board", matchesBoardSchema);
}
