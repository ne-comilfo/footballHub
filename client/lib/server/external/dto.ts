export type SportsDbTeam = {
  idAPIfootball: string | null;
  idTeam: string | null;
  strTeam: string | null;
  strBadge: string | null;
  strCountry: string | null;
  strStadium: string | null;
  strLeague: string | null;
  intFormedYear: string | null;
};

export type SportsDbPlayer = {
  idAPIfootball: string | null;
  idTeam: string | null;
  strPlayer: string | null;
  strTeam: string | null;
  strNationality: string | null;
  strPosition: string | null;
  strNumber: string | null;
  strCutout: string | null;
  strThumb: string | null;
  dateBorn: string | null;
};

export type SportsDbEvent = {
  idEvent: string;
  strLeague: string | null;
  strStatus: string | null;
  strTimestamp: string | null;
  idHomeTeam: string | null;
  idAwayTeam: string | null;
  strHomeTeam: string | null;
  strAwayTeam: string | null;
  strHomeTeamBadge: string | null;
  strAwayTeamBadge: string | null;
  intHomeScore: string | number | null;
  intAwayScore: string | number | null;
};

export type ApiFootballResponse<T> = { response: T[] };

export type ApiFootballTeam = {
  team: {
    id: number;
    name: string;
    country: string | null;
    founded: number | null;
    logo: string;
  };
  venue: {
    name: string | null;
    city: string | null;
    capacity: number | null;
  };
};

export type ApiFootballSquad = {
  players: {
    id: number;
    name: string;
    number: number | null;
    position: string | null;
    photo: string;
  }[];
};

export type ApiFootballLeague = {
  league: { id: number; name: string };
};

export type ApiFootballTeamStats = {
  league: { season: number | null };
  fixtures: {
    played: { total: number };
    wins: { total: number };
    draws: { total: number };
    loses: { total: number };
  };
};

export type ApiFootballFixture = {
  fixture: { id: number; date: string; status: { short: string } };
  league: { id: number; name: string };
  teams: {
    home: { id: number; name: string; logo: string };
    away: { id: number; name: string; logo: string };
  };
  goals: { home: number | null; away: number | null };
};

export type ApiFootballPlayer = {
  player: {
    id: number;
    name: string;
    firstname: string | null;
    lastname: string | null;
    age: number | null;
    nationality: string | null;
    height: string | null;
    weight: string | null;
    injured: boolean;
    photo: string;
    birth: { date: string | null };
  };
  statistics: {
    team: { id: number; name: string; logo: string };
    league: {
      id: number | null;
      name: string | null;
      country: string | null;
      season: number | null;
    };
    games: {
      appearences: number | null;
      position: string | null;
      rating: string | null;
    };
    goals: { total: number | null; assists: number | null };
  }[];
};
