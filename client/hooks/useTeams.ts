import { useQuery } from "@tanstack/react-query";
import type { TeamsQuery } from "@/contracts/team";
import { queryKeys } from "@/lib/queryKeys";
import {
  getPopularTeams,
  getTeam,
  getTeamFixtures,
  getTeamSquad,
  getTeamStats,
  getTeams,
} from "@/services/teamsApi";

const HOUR = 60 * 60 * 1000;

export function useTeams(query: TeamsQuery) {
  return useQuery({
    queryKey: queryKeys.teams.list(query),
    queryFn: () => getTeams(query),
    placeholderData: (previous) => previous,
    staleTime: HOUR,
  });
}

export function usePopularTeams() {
  return useQuery({
    queryKey: queryKeys.teams.popular(),
    queryFn: getPopularTeams,
    staleTime: 24 * HOUR,
  });
}

export function useTeam(id: string) {
  return useQuery({
    queryKey: queryKeys.teams.detail(id),
    queryFn: () => getTeam(id),
    enabled: Boolean(id),
    staleTime: HOUR,
  });
}

export function useTeamSquad(id: string) {
  return useQuery({
    queryKey: queryKeys.teams.squad(id),
    queryFn: () => getTeamSquad(id),
    enabled: Boolean(id),
    staleTime: HOUR,
  });
}

export function useTeamStats(id: string) {
  return useQuery({
    queryKey: queryKeys.teams.stats(id),
    queryFn: () => getTeamStats(id),
    enabled: Boolean(id),
    staleTime: HOUR,
  });
}

export function useTeamFixtures(id: string) {
  return useQuery({
    queryKey: queryKeys.teams.fixtures(id),
    queryFn: () => getTeamFixtures(id),
    enabled: Boolean(id),
    staleTime: HOUR,
  });
}
