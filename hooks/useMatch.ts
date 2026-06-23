import { useQuery } from "@tanstack/react-query";

import getMatchDay from "@/services/matchApi";

export function useMatch(date: string) {
  return useQuery({
    queryKey: ["matchDay"],
    queryFn: () => getMatchDay(date),
    refetchInterval: 1000 * 60,
  });
}
