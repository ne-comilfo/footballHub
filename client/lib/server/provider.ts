import {
  type Paginated,
  type Match,
  type MatchesBoard,
  type Player,
  type PlayerCard,
  type PlayersQuery,
  type TopScorer,
  type SquadPlayer,
  type Team,
  type TeamCard,
  type TeamFixture,
  type TeamStats,
  type TeamsQuery,
} from "@football-hub/contracts";

export interface FootballDataProvider {
  listTeams(query: TeamsQuery): Promise<Paginated<TeamCard>>;
  getPopularTeams(): Promise<TeamCard[]>;
  getTeam(id: string): Promise<Team | null>;
  getTeamSquad(id: string): Promise<SquadPlayer[]>;
  getTeamStats(id: string): Promise<TeamStats | null>;
  getTeamFixtures(id: string): Promise<TeamFixture[]>;

  listPlayers(query: PlayersQuery): Promise<Paginated<PlayerCard>>;
  getPopularPlayers(): Promise<PlayerCard[]>;
  getTopScorers(): Promise<TopScorer[]>;
  getPlayer(id: string): Promise<Player | null>;

  getMatchOfTheDay(date: string): Promise<Match | null>;
  getMatchesBoard(): Promise<MatchesBoard>;
}
