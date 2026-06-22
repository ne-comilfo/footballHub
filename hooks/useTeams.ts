import { useQuery } from "@tanstack/react-query";
import { getPopularTeams } from "@/services/teamsApi";

export default function usePopularTeams() {
    return useQuery({
        queryKey: ["popularTeams"],
        queryFn: getPopularTeams,
        staleTime: 5 * 1000 * 60,
    })
}