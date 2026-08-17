import { z } from "zod";

export const matchStatusSchema = z.enum(["scheduled", "live", "finished"]);

export type MatchStatus = z.infer<typeof matchStatusSchema>;

export const matchSideSchema = z.object({
  id: z.string(),
  name: z.string(),
  logo: z.string(),
  score: z.number().int().nullable(),
});

export const matchSchema = z.object({
  id: z.string(),
  league: z.string(),
  kickoff: z.string().nullable(),
  status: matchStatusSchema,
  home: matchSideSchema,
  away: matchSideSchema,
});

export type Match = z.infer<typeof matchSchema>;

export const matchesBoardSchema = z.object({
  latest: z.array(matchSchema),
  nearest: z.array(matchSchema),
});

export type MatchesBoard = z.infer<typeof matchesBoardSchema>;
