import { z } from "zod";
import { listQuerySchema } from "./common";

export const teamSortSchema = z
  .enum([
    "popularity_asc",
    "popularity_desc",
    "name_asc",
    "name_desc",
    "founded_asc",
    "founded_desc",
  ])
  .catch("popularity_desc");

export type TeamSort = z.infer<typeof teamSortSchema>;

export const teamsQuerySchema = listQuerySchema.extend({
  country: z.string().trim().default(""),
  competition: z.string().trim().default(""),
  foundedFrom: z.coerce.number().int().catch(0),
  foundedTo: z.coerce.number().int().catch(9999),
  sort: teamSortSchema,
});

export type TeamsQuery = z.infer<typeof teamsQuerySchema>;

export const teamCardSchema = z.object({
  id: z.string(),
  name: z.string(),
  logo: z.string(),
  country: z.string(),
  league: z.string().nullable(),
  stadium: z.string().nullable(),
  foundedYear: z.number().int().nullable(),
});

export type TeamCard = z.infer<typeof teamCardSchema>;

export const teamSchema = teamCardSchema.extend({
  venue: z.object({
    name: z.string().nullable(),
    city: z.string().nullable(),
    capacity: z.number().int().nullable(),
  }),
});

export type Team = z.infer<typeof teamSchema>;

export const squadPlayerSchema = z.object({
  id: z.string(),
  name: z.string(),
  photo: z.string(),
  position: z.string().nullable(),
  number: z.number().int().nullable(),
});

export type SquadPlayer = z.infer<typeof squadPlayerSchema>;

export const teamStatsSchema = z.object({
  season: z.number().int().nullable(),
  played: z.number().int(),
  wins: z.number().int(),
  draws: z.number().int(),
  loses: z.number().int(),
});

export type TeamStats = z.infer<typeof teamStatsSchema>;

export const teamFixtureSchema = z.object({
  id: z.string(),
  date: z.string(),
  isHome: z.boolean(),
  goalsFor: z.number().int().nullable(),
  goalsAgainst: z.number().int().nullable(),
  opponent: z.object({
    id: z.string(),
    name: z.string(),
    logo: z.string(),
  }),
  league: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

export type TeamFixture = z.infer<typeof teamFixtureSchema>;
