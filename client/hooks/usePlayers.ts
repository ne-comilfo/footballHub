import { useQuery } from "@tanstack/react-query";
import {
  getPopularPlayers,
  getPlayerInfo,
  getPLayerInfoApiFootball,
} from "@/services/playersApi";

export function usePopularPlayers() {
  return useQuery({
    queryKey: ["popularPlayers"],
    queryFn: getPopularPlayers,
    staleTime: 1000 * 60 * 5,
  });
}

export function usePlayer(id: string) {
  return useQuery({
    queryKey: ["sportsdb-player", id],
    queryFn: () => getPlayerInfo(id),
    staleTime: 1000 * 60 * 5,
  });
}

export function usePlayerApiFootball(id: string) {
  return useQuery({
    queryKey: ["api-football-player", id],
    queryFn: () => getPLayerInfoApiFootball(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 30,
  });
}
