import { useQuery } from "@tanstack/react-query";

import getMatchDay from "@/services/matchApi";

export function useMatch(date: string) {
  return useQuery({
    queryKey: ["matchDay"],
    queryFn: () => getMatchDay(date),
    staleTime: 5 * 1000 * 60,
  });
}
