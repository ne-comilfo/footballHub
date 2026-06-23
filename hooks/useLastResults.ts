import { useQuery } from "@tanstack/react-query";
import { getLastResults } from "@/services/lastResultsApi";

export default function useLastResults() {
  return useQuery({
    queryKey: ["latestResults"],
    queryFn: getLastResults,
    refetchInterval: 1000 * 60,
  });
}
