import { favoritesSchema } from "@football-hub/contracts";
import type { FavoriteInput, SupportedFavoriteKind } from "@football-hub/contracts";
import { apiFetch } from "@/lib/http";

export function getFavorites() {
  return apiFetch("/api/favorites", favoritesSchema);
}

export function addFavorite(input: FavoriteInput) {
  return apiFetch("/api/favorites", favoritesSchema, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}

export function removeFavorite(
  kind: SupportedFavoriteKind,
  entityId: string,
) {
  return apiFetch(`/api/favorites/${kind}/${entityId}`, favoritesSchema, {
    method: "DELETE",
  });
}
