import { getAllTeams } from "@/services/AllTeamsApi";
import { useQuery } from "@tanstack/react-query";

import { PartialFilters } from "@/services/AllTeamsApi";

export function useAllTeams(filters: PartialFilters) {
  return useQuery({
    queryKey: ["all-teams", filters],
    queryFn: () => getAllTeams(filters),
  });
}
