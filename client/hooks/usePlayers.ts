import { useQuery } from "@tanstack/react-query";
import {
  type PlayersQuery,
} from "@football-hub/contracts";
import { queryKeys } from "@/lib/queryKeys";
import {
  getPlayer,
  getPlayers,
  getPopularPlayers,
  getTopScorers,
} from "@/services/playersApi";

const HOUR = 60 * 60 * 1000;

export function usePlayers(query: PlayersQuery) {
  return useQuery({
    queryKey: queryKeys.players.list(query),
    queryFn: () => getPlayers(query),
    placeholderData: (previous) => previous,
    staleTime: HOUR,
  });
}

export function usePopularPlayers() {
  return useQuery({
    queryKey: queryKeys.players.popular(),
    queryFn: getPopularPlayers,
    staleTime: 24 * HOUR,
  });
}

export function usePlayer(id: string) {
  return useQuery({
    queryKey: queryKeys.players.detail(id),
    queryFn: () => getPlayer(id),
    enabled: Boolean(id),
    staleTime: HOUR,
  });
}

export function useTopScorers() {
  return useQuery({
    queryKey: queryKeys.players.topScorers(),
    queryFn: getTopScorers,
    staleTime: 6 * HOUR,
  });
}
