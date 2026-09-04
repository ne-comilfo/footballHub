import { serverEnv } from "@/lib/env";
import {
  type Paginated,
  type Match,
  type MatchesBoard,
  type Player,
  type PlayerCard,
  type PlayersQuery,
  type SquadPlayer,
  type Team,
  type TeamCard,
  type TeamFixture,
  type TeamStats,
  type TeamsQuery,
  type TopScorer,
} from "@football-hub/contracts";
import type { FootballDataProvider } from "../provider";
import { byField, equalsOrAny, matchesText, paginate } from "../list";
import { apiFootball, sportsDb, sportsDbLive, sportsDbPlayer } from "./client";
import {
  HIGHLIGHT_LEAGUE_ID,
  POPULAR_PLAYER_IDS,
  POPULAR_TEAM_IDS,
  SQUAD_TEAM_IDS,
  TEAM_LEAGUES,
  TOP_SCORERS_LEAGUE_ID,
  type ApiFootballFixture,
  type ApiFootballLeague,
  type ApiFootballPlayer,
  type ApiFootballResponse,
  type ApiFootballSquad,
  type ApiFootballTeam,
  type ApiFootballTeamStats,
  type SportsDbEvent,
  type SportsDbPlayer,
  type SportsDbTeam,
  mapApiFootballPlayer,
  mapApiFootballTeam,
  mapFixture,
  mapSportsDbEvent,
  mapSportsDbPlayer,
  mapSportsDbTeam,
  mapSquad,
  mapTeamStats,
} from "@football-hub/contracts/external";

function notEmpty<T>(value: T | null): value is T {
  return value !== null;
}

async function loadAllTeams(): Promise<TeamCard[]> {
  const leagues = await Promise.all(
    TEAM_LEAGUES.map((league) =>
      sportsDb<{ teams: SportsDbTeam[] | null }>(
        `/search_all_teams.php?l=${encodeURIComponent(league.replace(/ /g, "_"))}`,
      ),
    ),
  );

  return leagues
    .flatMap((league) => league.teams ?? [])
    .map(mapSportsDbTeam)
    .filter(notEmpty);
}

async function loadSquadPool(): Promise<PlayerCard[]> {
  const squads = await Promise.all(
    SQUAD_TEAM_IDS.map((teamId) =>
      sportsDb<{ player: SportsDbPlayer[] | null }>(
        `/lookup_all_players.php?id=${teamId}`,
      ),
    ),
  );

  return squads
    .flatMap((squad) => squad.player ?? [])
    .map(mapSportsDbPlayer)
    .filter(notEmpty);
}

function sortTeams(teams: TeamCard[], sort: TeamsQuery["sort"]) {
  switch (sort) {
    case "name_asc":
      return teams.sort(byField((team) => team.name, "asc"));
    case "name_desc":
      return teams.sort(byField((team) => team.name, "desc"));
    case "founded_asc":
      return teams.sort(byField((team) => team.foundedYear, "asc"));
    case "founded_desc":
      return teams.sort(byField((team) => team.foundedYear, "desc"));
    case "popularity_asc":
      return teams.sort(byField((team) => Number(team.id), "asc"));
    default:
      return teams.sort(byField((team) => Number(team.id), "desc"));
  }
}

function sortPlayers(players: PlayerCard[], sort: PlayersQuery["sort"]) {
  switch (sort) {
    case "name_asc":
      return players.sort(byField((player) => player.name, "asc"));
    case "age_asc":
      return players.sort(byField((player) => player.age, "asc"));
    case "age_desc":
      return players.sort(byField((player) => player.age, "desc"));
    case "club_asc":
      return players.sort(byField((player) => player.club.name, "asc"));
    case "club_desc":
      return players.sort(byField((player) => player.club.name, "desc"));
    default:
      return players.sort(byField((player) => player.name, "desc"));
  }
}

export const externalProvider: FootballDataProvider = {
  async listTeams(query: TeamsQuery): Promise<Paginated<TeamCard>> {
    const teams = (await loadAllTeams()).filter((team) => {
      const founded = team.foundedYear;

      return (
        matchesText(team.name, query.search) &&
        equalsOrAny(team.country, query.country) &&
        (!query.competition ||
          (team.league ?? "").includes(query.competition)) &&
        (founded === null ||
          (founded >= query.foundedFrom && founded <= query.foundedTo))
      );
    });

    return paginate(sortTeams(teams, query.sort), query.page, query.limit);
  },

  async getPopularTeams(): Promise<TeamCard[]> {
    const teams = await Promise.all(
      POPULAR_TEAM_IDS.map((id) =>
        sportsDb<{ teams: SportsDbTeam[] | null }>(`/lookupteam.php?id=${id}`),
      ),
    );

    return teams
      .flatMap((team) => team.teams ?? [])
      .map(mapSportsDbTeam)
      .filter(notEmpty);
  },

  async getTeam(id: string): Promise<Team | null> {
    const data = await apiFootball<ApiFootballResponse<ApiFootballTeam>>(
      `/teams?id=${id}`,
    );

    return data.response[0] ? mapApiFootballTeam(data.response[0]) : null;
  },

  async getTeamSquad(id: string): Promise<SquadPlayer[]> {
    const data = await apiFootball<ApiFootballResponse<ApiFootballSquad>>(
      `/players/squads?team=${id}`,
    );

    return data.response[0] ? mapSquad(data.response[0]) : [];
  },

  async getTeamStats(id: string): Promise<TeamStats | null> {
    const leagues = await apiFootball<ApiFootballResponse<ApiFootballLeague>>(
      `/leagues?team=${id}`,
    );
    const leagueId = leagues.response[0]?.league.id;

    if (!leagueId) {
      return null;
    }

    const stats = await apiFootball<{ response: ApiFootballTeamStats | null }>(
      `/teams/statistics?league=${leagueId}&team=${id}&season=${serverEnv.season}`,
    );

    return stats.response ? mapTeamStats(stats.response) : null;
  },

  async getTeamFixtures(id: string): Promise<TeamFixture[]> {
    const data = await apiFootball<ApiFootballResponse<ApiFootballFixture>>(
      `/fixtures?team=${id}&season=${serverEnv.season}`,
    );

    return data.response
      .filter((fixture) => fixture.goals.home !== null)
      .sort(
        (a, b) =>
          new Date(b.fixture.date).getTime() -
          new Date(a.fixture.date).getTime(),
      )
      .slice(0, 5)
      .map((fixture) => mapFixture(fixture, id));
  },

  async listPlayers(query: PlayersQuery): Promise<Paginated<PlayerCard>> {
    const players = (await loadSquadPool()).filter(
      (player) =>
        matchesText(player.name, query.search) &&
        equalsOrAny(player.country, query.country) &&
        equalsOrAny(player.position, query.position) &&
        equalsOrAny(player.club.name, query.club),
    );

    return paginate(sortPlayers(players, query.sort), query.page, query.limit);
  },

  async getPopularPlayers(): Promise<PlayerCard[]> {
    const players = await Promise.all(
      POPULAR_PLAYER_IDS.map((id) =>
        sportsDbPlayer<{ players: SportsDbPlayer[] | null }>(
          `/lookupplayer.php?id=${id}`,
        ),
      ),
    );

    return players
      .flatMap((player) => player.players ?? [])
      .map(mapSportsDbPlayer)
      .filter(notEmpty);
  },

  async getTopScorers(): Promise<TopScorer[]> {
    const data = await apiFootball<ApiFootballResponse<ApiFootballPlayer>>(
      `/players/topscorers?league=${TOP_SCORERS_LEAGUE_ID}&season=${serverEnv.season}`,
    );

    return data.response.flatMap((raw) => {
      const stats = raw.statistics[0];

      if (!stats) {
        return [];
      }

      return [
        {
          id: String(raw.player.id),
          name: raw.player.name,
          photo: raw.player.photo,
          goals: stats.goals.total ?? 0,
          assists: stats.goals.assists ?? 0,
          appearances: stats.games.appearences ?? 0,
          club: { id: String(stats.team.id), name: stats.team.name },
        },
      ];
    });
  },

  async getPlayer(id: string): Promise<Player | null> {
    const data = await apiFootball<ApiFootballResponse<ApiFootballPlayer>>(
      `/players?id=${id}&season=${serverEnv.season}`,
    );

    return data.response[0] ? mapApiFootballPlayer(data.response[0]) : null;
  },

  async getMatchOfTheDay(date: string): Promise<Match | null> {
    const data = await sportsDbLive<{ events: SportsDbEvent[] | null }>(
      `/eventsday.php?d=${date}&s=Soccer`, // &l=${HIGHLIGHT_LEAGUE_ID}
    );

    const events = (data.events ?? []).map(mapSportsDbEvent).filter(notEmpty);

    return (
      events.find(
        (event) =>
          event.kickoff !== null && new Date(event.kickoff).getUTCHours() > 15,
      ) ?? null
    );
  },

  async getMatchesBoard(): Promise<MatchesBoard> {
    const formatter = new Intl.DateTimeFormat("sv-SE", {
      timeZone: "Europe/Moscow",
    });

    const today = new Date();
    const yesterday = new Date();

    yesterday.setDate(today.getDate() - 1);

    const days = [formatter.format(today), formatter.format(yesterday)];

    const responses = await Promise.all(
      days.map((date) =>
        sportsDbLive<{ events: SportsDbEvent[] | null }>(
          `/eventsday.php?d=${date}&s=Soccer`, // &l=${HIGHLIGHT_LEAGUE_ID}
        ),
      ),
    );

    const events = responses
      .flatMap((response) => response.events ?? [])
      .map(mapSportsDbEvent)
      .filter(notEmpty);

    const time = (match: Match) =>
      match.kickoff ? new Date(match.kickoff).getTime() : 0;

    return {
      latest: events
        .filter((event) => event.status === "finished")
        .sort((a, b) => time(b) - time(a))
        .slice(0, 5),
      nearest: events
        .filter((event) => event.status !== "finished")
        .sort((a, b) => time(a) - time(b))
        .slice(0, 5),
    };
  },
};
