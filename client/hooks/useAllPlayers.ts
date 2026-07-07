import { getAllPlayers } from "@/services/playersApi";
import { PlayerFilters } from "@/types/player";
import { useQuery } from "@tanstack/react-query";

export function useAllPlayers(filters: Partial<PlayerFilters>, search: string) {
  return useQuery({
    queryKey: ["all-players", filters, search],
    queryFn: () => getAllPlayers({ ...filters, search }),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 10,
  });
}
