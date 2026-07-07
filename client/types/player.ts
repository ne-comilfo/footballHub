export interface PlayerHeroProps {
  player: Player;
}

export type PlayerFilters = {
  page?: string;
  limit?: string;
  search?: string;
  country: string;
  position: string;
  club: string;
  sort: string;
};

export type SportsDbPlayer = {
  idAPIfootball: string;
  idTeam: string;
  strPlayer: string;
  strTeam: string;
  strNationality: string | null;
  strPosition: string | null;
  strNumber: string | null;
  strCutout: string | null;
  strThumb: string | null;
  dateBorn: string | null;
};

export type PlayerListItem = {
  idAPIfootball: string;
  name: string;
  image: string;
  country: string;
  position: string;
  number: string | null;
  club: string;
  teamId: string;
  age: number | null;
  stats: PlayerStat[];
};

export type PlayersListResponse = {
  items: PlayerListItem[];
  totalItems: number;
  totalPages: number;
};

export interface Player {
  player: PlayerBase;

  statistics: {
    team: {
      id: number;
      name: string;
      logo: string;
    };

    league: {
      id: number | null;
      name: string;
      country: string | null;
      season: number;
      logo: string | null;
      flag: string | null;
    };

    games: {
      appearences: number;
      lineups: number;
      minutes: number;
      number: number | null;
      position: string;
      rating: string | null;
      captain: boolean;
    };

    goals: {
      total: number | null;
      assists: number | null;
    };
  }[];
}

export interface PlayerBase {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  age: number;
  nationality: string;
  height: string;
  weight: string;
  injured: boolean;
  photo: string;
  country: string;

  birth: {
    date: string;
    place: string;
  };
}

export type PlayerStat = {
  label: string;
  value: string | number;
};

export interface PlayerSeason {
  league: {
    name: string;
    country: string | null;
  };

  games: {
    appearences: number;
  };

  goals: {
    total: number | null;
    assists: number | null;
  };
}

export type PlayerNews = {
  title: string;
  description: string;
};

export interface PlayerDetails {
  id: number;
  name: string;
  image: string;
  country: string;
  age: string;
  position: string;
  number: string | null;
  foot: string;
  club: string;
  stats: PlayerStat[];
  seasons: {
    tournament: string;
    matches: string;
    goals: string;
    assists: string;
  }[];
  strengths: string[];
  news: PlayerNews[];
}
