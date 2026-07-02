import { useQuery } from "@tanstack/react-query";

import getMatchDay from "@/services/matchApi";

export function useMatch(date: string) {
  return useQuery({
    queryKey: ["matchDay", date],
    queryFn: () => getMatchDay(date),
    staleTime: 10 * 60 * 1000,
    enabled: !!date,
  });
}
