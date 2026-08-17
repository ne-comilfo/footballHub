import type { Paginated } from "@/contracts/common";
import type { Match, MatchesBoard } from "@/contracts/match";
import type { Player, PlayerCard, PlayersQuery } from "@/contracts/player";
import type {
  SquadPlayer,
  Team,
  TeamCard,
  TeamFixture,
  TeamStats,
  TeamsQuery,
} from "@/contracts/team";

export interface FootballDataProvider {
  listTeams(query: TeamsQuery): Promise<Paginated<TeamCard>>;
  getPopularTeams(): Promise<TeamCard[]>;
  getTeam(id: string): Promise<Team | null>;
  getTeamSquad(id: string): Promise<SquadPlayer[]>;
  getTeamStats(id: string): Promise<TeamStats | null>;
  getTeamFixtures(id: string): Promise<TeamFixture[]>;

  listPlayers(query: PlayersQuery): Promise<Paginated<PlayerCard>>;
  getPopularPlayers(): Promise<PlayerCard[]>;
  getPlayer(id: string): Promise<Player | null>;

  getMatchOfTheDay(date: string): Promise<Match | null>;
  getMatchesBoard(): Promise<MatchesBoard>;
}
