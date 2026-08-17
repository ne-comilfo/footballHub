import type { PlayerSort, PlayersQuery } from "@/contracts/player";
import type { TeamSort, TeamsQuery } from "@/contracts/team";
import { DEFAULT_FILTERS } from "@/data/teams";
import { DEFAULT_PLAYER_FILTERS } from "@/data/player-filters";

const TEAM_SORT_BY_LABEL: Record<string, TeamSort> = {
  "По популярности ↓": "popularity_desc",
  "По популярности ↑": "popularity_asc",
  "По названию ↓": "name_desc",
  "По названию ↑": "name_asc",
  "По году основания ↓": "founded_desc",
  "По году основания ↑": "founded_asc",
};

const PLAYER_SORT_BY_LABEL: Record<string, PlayerSort> = {
  "По имени ↓": "name_desc",
  "По имени ↑": "name_asc",
  "По возрасту ↓": "age_desc",
  "По возрасту ↑": "age_asc",
  "По клубу ↓": "club_desc",
  "По клубу ↑": "club_asc",
};

function positiveInt(value: string | null, fallback: number) {
  const parsed = Number(value);

  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function withoutSentinel(value: string | null, sentinel: string) {
  return !value || value === sentinel ? "" : value;
}

export function readTeamsQuery(searchParams: URLSearchParams): TeamsQuery {
  return {
    page: positiveInt(searchParams.get("page"), 1),
    limit: positiveInt(searchParams.get("limit"), Number(DEFAULT_FILTERS.limit)),
    search: searchParams.get("search")?.trim() ?? "",
    country: withoutSentinel(
      searchParams.get("country"),
      DEFAULT_FILTERS.country,
    ),
    competition: withoutSentinel(
      searchParams.get("competition"),
      DEFAULT_FILTERS.competition,
    ),
    foundedFrom: positiveInt(
      searchParams.get("foundedFrom"),
      Number(DEFAULT_FILTERS.foundedFrom),
    ),
    foundedTo: positiveInt(
      searchParams.get("foundedTo"),
      Number(DEFAULT_FILTERS.foundedTo),
    ),
    sort:
      TEAM_SORT_BY_LABEL[searchParams.get("sort") ?? ""] ?? "popularity_desc",
  };
}

export function readPlayersQuery(searchParams: URLSearchParams): PlayersQuery {
  return {
    page: positiveInt(searchParams.get("page"), 1),
    limit: positiveInt(
      searchParams.get("limit"),
      Number(DEFAULT_PLAYER_FILTERS.limit),
    ),
    search: searchParams.get("search")?.trim() ?? "",
    country: withoutSentinel(
      searchParams.get("country"),
      DEFAULT_PLAYER_FILTERS.country,
    ),
    position: withoutSentinel(
      searchParams.get("position"),
      DEFAULT_PLAYER_FILTERS.position,
    ),
    club: withoutSentinel(searchParams.get("club"), DEFAULT_PLAYER_FILTERS.club),
    sort: PLAYER_SORT_BY_LABEL[searchParams.get("sort") ?? ""] ?? "name_desc",
  };
}
