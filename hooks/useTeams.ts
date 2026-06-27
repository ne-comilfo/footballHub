import { useQuery } from "@tanstack/react-query";
import {
  getPopularTeams,
  getTeamInfoApiFootball,
  getTeamInfo,
} from "@/services/teamsApi";

export function usePopularTeams() {
  return useQuery({
    queryKey: ["popularTeams"],
    queryFn: getPopularTeams,
    staleTime: 60 * 24 * 1000 * 60,
  });
}

export function useTeam(id: string) {
  return useQuery({
    queryKey: ["sportsdb-team", id],
    queryFn: () => getTeamInfo(id),
    staleTime: 1000 * 60 * 5,
  });
}

export function useTeamsApiFootbal(id: string) {
  return useQuery({
    queryKey: ["team", id],
    queryFn: () => getTeamInfoApiFootball(id),
    enabled: !!id,
    staleTime: 5 * 1000 * 60,
  });
}
