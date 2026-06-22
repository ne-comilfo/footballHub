import { useQuery } from "@tanstack/react-query";
import { getPopularPlayers } from "@/services/playersApi";

export default function usePopularPlayers() {
  return useQuery({
    queryKey: ["popularPlayers"],
    queryFn: getPopularPlayers,
    staleTime: 1000 * 60 * 5,
  });
}