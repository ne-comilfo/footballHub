import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  FavoriteInput,
  Favorites,
  SupportedFavoriteKind,
} from "@football-hub/contracts";

import { ApiError } from "@/lib/http";
import { queryKeys } from "@/lib/queryKeys";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "@/services/favoritesApi";
import { useMe } from "./useAuth";

const EMPTY: Favorites = { teams: [], players: [] };

export function useFavorites() {
  const { data: user } = useMe();

  return useQuery({
    queryKey: queryKeys.favorites.all(),
    queryFn: getFavorites,
    enabled: Boolean(user),
    staleTime: 0,
    refetchOnWindowFocus: true,
    retry: false,
  });
}

export function useIsFavorite(kind: SupportedFavoriteKind, entityId: string) {
  const { data } = useFavorites();
  const list = kind === "team" ? data?.teams : data?.players;

  return Boolean(list?.some((item) => item.id === entityId));
}

export function useToggleFavorite(
  kind: SupportedFavoriteKind,
  entityId: string,
) {
  const queryClient = useQueryClient();
  const isFavorite = useIsFavorite(kind, entityId);

  return useMutation({
    mutationFn: () =>
      isFavorite
        ? removeFavorite(kind, entityId)
        : addFavorite({ kind, entityId } as FavoriteInput),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queryKeys.favorites.all() });

      const previous = queryClient.getQueryData<Favorites>(
        queryKeys.favorites.all(),
      );

      queryClient.setQueryData<Favorites>(
        queryKeys.favorites.all(),
        (current = EMPTY) => {
          const key = kind === "team" ? "teams" : "players";
          const list = current[key];

          return {
            ...current,
            [key]: isFavorite
              ? list.filter((item) => item.id !== entityId)
              : list,
          } as Favorites;
        },
      );

      return { previous };
    },

    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.favorites.all(), context.previous);
      }
    },

    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.favorites.all(), data);
    },

    onSettled: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.favorites.all(),
      });
    },
  });
}

export function isUnauthorized(error: unknown) {
  return error instanceof ApiError && error.status === 401;
}
