import { z } from "zod";
import { playerCardSchema } from "./player";
import { teamCardSchema } from "./team";

export const favoriteKindSchema = z.enum(["team", "player", "match", "news"]);

export type FavoriteKind = z.infer<typeof favoriteKindSchema>;

export const supportedFavoriteKindSchema = z.enum(["team", "player"]);

export type SupportedFavoriteKind = z.infer<typeof supportedFavoriteKindSchema>;

export const favoriteInputSchema = z.object({
  kind: supportedFavoriteKindSchema,
  entityId: z.string().min(1),
});

export type FavoriteInput = z.infer<typeof favoriteInputSchema>;

export const favoritesSchema = z.object({
  teams: z.array(teamCardSchema),
  players: z.array(playerCardSchema),
});

export type Favorites = z.infer<typeof favoritesSchema>;
