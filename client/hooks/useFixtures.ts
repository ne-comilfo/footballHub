import { getTeamFixtures } from "@/services/fixtutresApi";
import { useQuery } from "@tanstack/react-query";

export function useTeamFixtures(id: string) {
  return useQuery({
    queryKey: ["team-fixtures", id],
    queryFn: () => getTeamFixtures(id),
    enabled: !!id,
    staleTime: 60 * 60 * 1000
  });
}
