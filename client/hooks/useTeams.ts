import { useQuery } from "@tanstack/react-query";
import {
  getPopularTeams,
  getTeamInfoApiFootball,
  getTeamInfo,
  getTeamStats,
  getTeamLeague,
  getPlayersOfTeam,
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
    staleTime: 60 * 60 * 1000,
  });
}

export function useTeamsApiFootbal(id: string) {
  return useQuery({
    queryKey: ["team", id],
    queryFn: () => getTeamInfoApiFootball(id),
    enabled: !!id,
    staleTime: 60 * 60 * 1000,
  });
}

export function useTeamLeague(id: string) {
  return useQuery({
    queryKey: ["team-league", id],
    queryFn: () => getTeamLeague(id),
    enabled: !!id,
    staleTime: 60 * 60 * 1000,
  });
}

export function useTeamStats(league: string, id: string, season: string) {
  return useQuery({
    queryKey: ["teamStats", league, id, season],
    queryFn: () => getTeamStats(league, id, season),
    enabled: !!league,
    staleTime: 60 * 60 * 1000,
  });
}

export function usePlayersOfTeam(teamId: string) {
  return useQuery({
    queryKey: ["players-of-team", teamId],
    queryFn: () => getPlayersOfTeam(teamId),
    enabled: !!teamId,
    staleTime: 60 * 60 * 1000,
  });
}
