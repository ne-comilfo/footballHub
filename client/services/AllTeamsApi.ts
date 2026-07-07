export type PartialFilters = Partial<{
  page: number;
  limit: number;
  search: string;
  country: string;
  foundedFrom: string;
  foundedTo: string;
  sort: string;
}>;

export async function getAllTeams(
  filters: PartialFilters,
  //   добавить в будующем рефетч при изменении на сервер и тд, пока похуй
) {
  const leaguesIDs = [
    "English Premier League",
    "English League Championship",
    "Scottish Premier League",
    "German Bundesliga",
    "Italian Serie A",
  ];

  const teams = await Promise.all(
    leaguesIDs.map((leagueId) =>
      getTeamByLeague(leagueId.split(" ").join("_")),
    ),
  );

  if (!teams) {
    throw new Error("Pizdec");
  }

  return teams.flat();
}

async function getTeamByLeague(leagueId: string) {
  const response = await fetch(`/api/teams/all/${leagueId}`);

  const data = await response.json();

  if (!data.teams) {
    throw new Error(`Failed to load team`);
  }

  return data.teams;
}
