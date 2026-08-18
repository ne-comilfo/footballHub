import { z } from "zod";
import { listQuerySchema } from "./common";

export const playerSortSchema = z
  .enum([
    "name_asc",
    "name_desc",
    "age_asc",
    "age_desc",
    "club_asc",
    "club_desc",
  ])
  .catch("name_desc");

export type PlayerSort = z.infer<typeof playerSortSchema>;

export const playersQuerySchema = listQuerySchema.extend({
  country: z.string().trim().default(""),
  position: z.string().trim().default(""),
  club: z.string().trim().default(""),
  sort: playerSortSchema,
});

export type PlayersQuery = z.infer<typeof playersQuerySchema>;

export const playerCardSchema = z.object({
  id: z.string(),
  name: z.string(),
  photo: z.string(),
  country: z.string(),
  position: z.string(),
  number: z.string().nullable(),
  age: z.number().int().nullable(),
  club: z.object({
    id: z.string().nullable(),
    name: z.string(),
  }),
});

export type PlayerCard = z.infer<typeof playerCardSchema>;

export const playerSeasonSchema = z.object({
  leagueName: z.string(),
  leagueCountry: z.string().nullable(),
  season: z.number().int().nullable(),
  appearances: z.number().int(),
  goals: z.number().int(),
  assists: z.number().int(),
});

export type PlayerSeason = z.infer<typeof playerSeasonSchema>;

export const playerSchema = playerCardSchema.extend({
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  birthDate: z.string().nullable(),
  heightCm: z.number().int().nullable(),
  weightKg: z.number().int().nullable(),
  injured: z.boolean(),
  totals: z.object({
    goals: z.number().int(),
    assists: z.number().int(),
    matches: z.number().int(),
    rating: z.number().nullable(),
  }),
  seasons: z.array(playerSeasonSchema),
});

export type Player = z.infer<typeof playerSchema>;
