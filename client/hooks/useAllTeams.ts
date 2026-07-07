import { getAllTeams } from "@/services/AllTeamsApi";
import { useQuery } from "@tanstack/react-query";

import { PartialFilters } from "@/services/AllTeamsApi";

export function useAllTeams(filters: PartialFilters, search: string) {
  return useQuery({
    queryKey: ["all-teams", filters, search],
    queryFn: () => getAllTeams(filters, search),
    placeholderData: (previousData) => previousData,
  });
}
