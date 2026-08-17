import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { getMatchOfTheDay, getMatchesBoard } from "@/services/matchesApi";

const MINUTE = 60 * 1000;

export function useMatchOfTheDay(date: string) {
  return useQuery({
    queryKey: queryKeys.matches.day(date),
    queryFn: () => getMatchOfTheDay(date),
    enabled: Boolean(date),
    staleTime: 10 * MINUTE,
  });
}

export function useMatchesBoard() {
  return useQuery({
    queryKey: queryKeys.matches.board(),
    queryFn: getMatchesBoard,
    refetchInterval: MINUTE,
    staleTime: MINUTE,
  });
}
