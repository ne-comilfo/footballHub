import { DEFAULT_FILTERS } from "@/data/teams";
import type { TeamCardProps } from "@/types/team";

export type PartialFilters = Partial<{
  page: number | string;
  limit: number | string;
  search: string;
  country: string;
  competition: string;
  foundedFrom: string;
  foundedTo: string;
  sort: string;
}>;

type TeamsListResponse = {
  items: TeamCardProps[];
  totalItems: number;
  totalPages: number;
};

export async function getAllTeams(
  filters: PartialFilters,
  search: string,
  //   добавить в будующем рефетч при изменении на сервер и тд, пока похуй
): Promise<TeamsListResponse> {
  const leaguesIDs = [
    "English Premier League",
    "English League Championship",
    "Scottish Premier League",
    "German Bundesliga",
    "Italian Serie A",
    "Spanish La Liga",
    "French Ligue 1",
  ];

  const teams = await Promise.all(
    leaguesIDs.map((leagueId) =>
      getTeamByLeague(leagueId.split(" ").join("_")),
    ),
  );

  if (!teams) {
    throw new Error("Pizdec");
  }

  const activeSearch = (search || filters.search || "").trim().toLowerCase();
  const country = filters.country ?? DEFAULT_FILTERS.country;
  const competition = filters.competition ?? DEFAULT_FILTERS.competition;
  const foundedFrom = Number(filters.foundedFrom ?? DEFAULT_FILTERS.foundedFrom);
  const foundedTo = Number(filters.foundedTo ?? DEFAULT_FILTERS.foundedTo);

  const filteredTeams = teams
    .flat()
    .filter((team) => {
      const formedYear = Number(team.intFormedYear);
      const matchesSearch =
        !activeSearch || team.strTeam.toLowerCase().includes(activeSearch);
      const matchesCountry =
        country === DEFAULT_FILTERS.country || team.strCountry === country;
      const matchesCompetition =
        competition === DEFAULT_FILTERS.competition ||
        team.strLeague?.includes(competition);
      const matchesFounded =
        !Number.isFinite(formedYear) ||
        (formedYear >= foundedFrom && formedYear <= foundedTo);

      return (
        matchesSearch &&
        matchesCountry &&
        matchesCompetition &&
        matchesFounded
      );
    })
    .sort((teamA, teamB) => {
      switch (filters.sort) {
        case "По популярности ↑":
          return Number(teamA.idAPIfootball) - Number(teamB.idAPIfootball);
        case "По названию ↓":
          return teamB.strTeam.localeCompare(teamA.strTeam);
        case "По названию ↑":
          return teamA.strTeam.localeCompare(teamB.strTeam);
        case "По году основания ↓":
          return Number(teamB.intFormedYear) - Number(teamA.intFormedYear);
        case "По году основания ↑":
          return Number(teamA.intFormedYear) - Number(teamB.intFormedYear);
        default:
          return 0;
      }
    });

  const limit = Math.max(Number(filters.limit ?? DEFAULT_FILTERS.limit), 1);
  const page = Math.max(Number(filters.page ?? DEFAULT_FILTERS.page), 1);
  const totalPages = Math.max(Math.ceil(filteredTeams.length / limit), 1);
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * limit;

  return {
    items: filteredTeams.slice(startIndex, startIndex + limit),
    totalItems: filteredTeams.length,
    totalPages,
  };
}

async function getTeamByLeague(leagueId: string): Promise<TeamCardProps[]> {
  const response = await fetch(`/api/teams/all/${leagueId}`);

  const data = await response.json();

  if (!data.teams) {
    throw new Error(`Failed to load team`);
  }

  return data.teams;
}
