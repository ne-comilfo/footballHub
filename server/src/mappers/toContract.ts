import type {
  Match,
  MatchStatus,
  Player,
  PlayerCard,
  PlayerSeason,
  SquadPlayer,
  Team,
  TeamCard,
  TeamFixture,
  TeamStats,
} from "@football-hub/contracts";

export type TeamRecord = {
  id: string;
  name: string;
  logo: string;
  country: string;
  league: string | null;
  stadium: string | null;
  foundedYear: number | null;
  venueName: string | null;
  venueCity: string | null;
  venueCapacity: number | null;
};

export type PlayerRecord = {
  id: string;
  name: string;
  photo: string;
  country: string;
  position: string;
  number: string | null;
  birthDate: Date | null;
  heightCm: number | null;
  weightKg: number | null;
  injured: boolean;
  teamId: string | null;
  team: { id: string; name: string } | null;
};

export type PlayerSeasonRecord = {
  season: number | null;
  leagueName: string;
  leagueCountry: string | null;
  appearances: number;
  goals: number;
  assists: number;
  rating: unknown;
};

export type MatchRecord = {
  id: string;
  leagueId: string | null;
  leagueName: string;
  kickoff: Date | null;
  status: string;
  homeScore: number | null;
  awayScore: number | null;
  homeTeamId: string;
  awayTeamId: string;
  homeTeam: { id: string; name: string; logo: string };
  awayTeam: { id: string; name: string; logo: string };
};

function toNumber(value: unknown): number | null {
  if (value === null || value === undefined) {
    return null;
  }

  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : null;
}

export function ageFromBirthDate(birthDate: Date | null): number | null {
  if (!birthDate) {
    return null;
  }

  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const hadBirthday =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  return hadBirthday ? age : age - 1;
}

export function toTeamCard(record: TeamRecord): TeamCard {
  return {
    id: record.id,
    name: record.name,
    logo: record.logo,
    country: record.country,
    league: record.league,
    stadium: record.stadium,
    foundedYear: record.foundedYear,
  };
}

export function toTeam(record: TeamRecord): Team {
  return {
    ...toTeamCard(record),
    venue: {
      name: record.venueName ?? record.stadium,
      city: record.venueCity,
      capacity: record.venueCapacity,
    },
  };
}

export function toSquadPlayer(record: PlayerRecord): SquadPlayer {
  return {
    id: record.id,
    name: record.name,
    photo: record.photo,
    position: record.position,
    number: record.number,
  };
}

export function toPlayerCard(record: PlayerRecord): PlayerCard {
  return {
    id: record.id,
    name: record.name,
    photo: record.photo,
    country: record.country,
    position: record.position,
    number: record.number,
    age: ageFromBirthDate(record.birthDate),
    club: {
      id: record.team?.id ?? record.teamId,
      name: record.team?.name ?? "Unknown",
    },
  };
}

export function toPlayerSeason(record: PlayerSeasonRecord): PlayerSeason {
  return {
    leagueName: record.leagueName,
    leagueCountry: record.leagueCountry,
    season: record.season,
    appearances: record.appearances,
    goals: record.goals,
    assists: record.assists,
  };
}

export function toPlayer(
  record: PlayerRecord,
  seasonStats: PlayerSeasonRecord[],
): Player {
  const seasons = seasonStats.map(toPlayerSeason);
  const ratings = seasonStats
    .map((season) => toNumber(season.rating))
    .filter((rating): rating is number => rating !== null);

  return {
    ...toPlayerCard(record),
    firstName: null,
    lastName: null,
    birthDate: record.birthDate ? record.birthDate.toISOString() : null,
    heightCm: record.heightCm,
    weightKg: record.weightKg,
    injured: record.injured,
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

export function toTeamStats(record: {
  season: number;
  played: number;
  wins: number;
  draws: number;
  loses: number;
}): TeamStats {
  return {
    season: record.season,
    played: record.played,
    wins: record.wins,
    draws: record.draws,
    loses: record.loses,
  };
}

export function toMatch(record: MatchRecord): Match {
  return {
    id: record.id,
    league: record.leagueName,
    kickoff: record.kickoff ? record.kickoff.toISOString() : null,
    status: record.status as MatchStatus,
    home: {
      id: record.homeTeam.id,
      name: record.homeTeam.name,
      logo: record.homeTeam.logo,
      score: record.homeScore,
    },
    away: {
      id: record.awayTeam.id,
      name: record.awayTeam.name,
      logo: record.awayTeam.logo,
      score: record.awayScore,
    },
  };
}

export function toTeamFixture(
  record: MatchRecord & { kickoff: Date },
  teamId: string,
): TeamFixture {
  const isHome = record.homeTeamId === teamId;
  const opponent = isHome ? record.awayTeam : record.homeTeam;

  return {
    id: record.id,
    date: record.kickoff.toISOString(),
    isHome,
    goalsFor: isHome ? record.homeScore : record.awayScore,
    goalsAgainst: isHome ? record.awayScore : record.homeScore,
    opponent: {
      id: opponent.id,
      name: opponent.name,
      logo: opponent.logo,
    },
    league: {
      id: record.leagueId ?? "",
      name: record.leagueName,
    },
  };
}
