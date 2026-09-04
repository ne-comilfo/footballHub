import {
  type PlayersQuery,
  type TeamsQuery,
} from "@football-hub/contracts";

export const queryKeys = {
  auth: {
    me: () => ["auth", "me"] as const,
  },
  teams: {
    list: (query: TeamsQuery) => ["teams", "list", query] as const,
    popular: () => ["teams", "popular"] as const,
    detail: (id: string) => ["teams", "detail", id] as const,
    squad: (id: string) => ["teams", "squad", id] as const,
    stats: (id: string) => ["teams", "stats", id] as const,
    fixtures: (id: string) => ["teams", "fixtures", id] as const,
  },
  players: {
    list: (query: PlayersQuery) => ["players", "list", query] as const,
    popular: () => ["players", "popular"] as const,
    topScorers: () => ["players", "top-scorers"] as const,
    detail: (id: string) => ["players", "detail", id] as const,
  },
  matches: {
    day: (date: string) => ["matches", "day", date] as const,
    board: () => ["matches", "board"] as const,
  },
} as const;
