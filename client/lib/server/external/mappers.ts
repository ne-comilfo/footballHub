import type { Match, MatchStatus } from "@/contracts/match";
import type { Player, PlayerCard } from "@/contracts/player";
import type {
  SquadPlayer,
  Team,
  TeamCard,
  TeamFixture,
  TeamStats,
} from "@/contracts/team";
import type {
  ApiFootballFixture,
  ApiFootballPlayer,
  ApiFootballSquad,
  ApiFootballTeam,
  ApiFootballTeamStats,
  SportsDbEvent,
  SportsDbPlayer,
  SportsDbTeam,
} from "./dto";

const PLAYER_PLACEHOLDER =
  "https://www.thesportsdb.com/images/media/player/thumb/ywruys1473507097.jpg";

function toNumber(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : null;
}

export function ageFromBirthDate(birthDate: string | null): number | null {
  if (!birthDate) {
    return null;
  }

  const born = new Date(birthDate);

  if (Number.isNaN(born.getTime())) {
    return null;
  }

  const today = new Date();
  const age = today.getFullYear() - born.getFullYear();
  const hadBirthday =
    today.getMonth() > born.getMonth() ||
    (today.getMonth() === born.getMonth() &&
      today.getDate() >= born.getDate());

  return hadBirthday ? age : age - 1;
}

export function mapSportsDbTeam(raw: SportsDbTeam): TeamCard | null {
  if (!raw.idAPIfootball || !raw.strTeam || !raw.strBadge) {
    return null;
  }

  return {
    id: raw.idAPIfootball,
    name: raw.strTeam,
    logo: raw.strBadge,
    country: raw.strCountry ?? "Unknown",
    league: raw.strLeague,
    stadium: raw.strStadium,
    foundedYear: toNumber(raw.intFormedYear),
  };
}

export function mapApiFootballTeam(raw: ApiFootballTeam): Team {
  return {
    id: String(raw.team.id),
    name: raw.team.name,
    logo: raw.team.logo,
    country: raw.team.country ?? "Unknown",
    league: null,
    stadium: raw.venue.name,
    foundedYear: raw.team.founded,
    venue: {
      name: raw.venue.name,
      city: raw.venue.city,
      capacity: raw.venue.capacity,
    },
  };
}

export function mapSquad(raw: ApiFootballSquad): SquadPlayer[] {
  return raw.players.map((player) => ({
    id: String(player.id),
    name: player.name,
    photo: player.photo,
    position: player.position,
    number: player.number,
  }));
}

export function mapTeamStats(raw: ApiFootballTeamStats): TeamStats {
  return {
    season: raw.league.season,
    played: raw.fixtures.played.total,
    wins: raw.fixtures.wins.total,
    draws: raw.fixtures.draws.total,
    loses: raw.fixtures.loses.total,
  };
}

export function mapFixture(
  raw: ApiFootballFixture,
  teamId: string,
): TeamFixture {
  const isHome = String(raw.teams.home.id) === teamId;
  const opponent = isHome ? raw.teams.away : raw.teams.home;

  return {
    id: String(raw.fixture.id),
    date: raw.fixture.date,
    isHome,
    goalsFor: isHome ? raw.goals.home : raw.goals.away,
    goalsAgainst: isHome ? raw.goals.away : raw.goals.home,
    opponent: {
      id: String(opponent.id),
      name: opponent.name,
      logo: opponent.logo,
    },
    league: {
      id: String(raw.league.id),
      name: raw.league.name,
    },
  };
}

export function mapSportsDbPlayer(raw: SportsDbPlayer): PlayerCard | null {
  if (!raw.idAPIfootball || !raw.strPlayer) {
    return null;
  }

  return {
    id: raw.idAPIfootball,
    name: raw.strPlayer,
    photo: raw.strCutout ?? raw.strThumb ?? PLAYER_PLACEHOLDER,
    country: raw.strNationality ?? "Unknown",
    position: raw.strPosition ?? "Unknown",
    number: raw.strNumber,
    age: ageFromBirthDate(raw.dateBorn),
    club: {
      id: raw.idTeam,
      name: raw.strTeam ?? "Unknown",
    },
  };
}

export function mapApiFootballPlayer(raw: ApiFootballPlayer): Player {
  const seasons = raw.statistics.map((stat) => ({
    leagueName: stat.league.name ?? "Unknown",
    leagueCountry: stat.league.country,
    season: stat.league.season,
    appearances: stat.games.appearences ?? 0,
    goals: stat.goals.total ?? 0,
    assists: stat.goals.assists ?? 0,
  }));

  const main =
    raw.statistics.find((stat) => (stat.games.appearences ?? 0) > 0) ??
    raw.statistics[0];

  const ratings = raw.statistics
    .map((stat) => toNumber(stat.games.rating))
    .filter((rating): rating is number => rating !== null);

  return {
    id: String(raw.player.id),
    name: raw.player.name,
    photo: raw.player.photo,
    country: raw.player.nationality ?? "Unknown",
    position: main?.games.position ?? "Unknown",
    number: null,
    age: raw.player.age ?? ageFromBirthDate(raw.player.birth.date),
    club: {
      id: main ? String(main.team.id) : null,
      name: main?.team.name ?? "Unknown",
    },
    firstName: raw.player.firstname,
    lastName: raw.player.lastname,
    birthDate: raw.player.birth.date,
    heightCm: toNumber(raw.player.height?.replace(/\D/g, "") ?? null),
    weightKg: toNumber(raw.player.weight?.replace(/\D/g, "") ?? null),
    injured: raw.player.injured,
    totals: {
      goals: seasons.reduce((sum, season) => sum + season.goals, 0),
      assists: seasons.reduce((sum, season) => sum + season.assists, 0),
      matches: seasons.reduce((sum, season) => sum + season.appearances, 0),
      rating: ratings.length
        ? Number(
            (
              ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
            ).toFixed(2),
          )
        : null,
    },
    seasons,
  };
}

function mapMatchStatus(status: string | null): MatchStatus {
  if (status === "FT" || status === "AET" || status === "PEN") {
    return "finished";
  }

  if (!status || status === "NS" || status === "Not Started") {
    return "scheduled";
  }

  return "live";
}

export function mapSportsDbEvent(raw: SportsDbEvent): Match | null {
  if (!raw.strHomeTeam || !raw.strAwayTeam) {
    return null;
  }

  return {
    id: raw.idEvent,
    league: raw.strLeague ?? "Unknown",
    kickoff: raw.strTimestamp ? `${raw.strTimestamp}Z` : null,
    status: mapMatchStatus(raw.strStatus),
    home: {
      id: raw.idHomeTeam ?? "",
      name: raw.strHomeTeam,
      logo: raw.strHomeTeamBadge ?? "",
      score: toNumber(raw.intHomeScore),
    },
    away: {
      id: raw.idAwayTeam ?? "",
      name: raw.strAwayTeam,
      logo: raw.strAwayTeamBadge ?? "",
      score: toNumber(raw.intAwayScore),
    },
  };
}
