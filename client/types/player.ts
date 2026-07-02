export interface PlayerHeroProps {
  player: Player;
}

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
  value: string;
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

export interface PlayerDetails extends PlayerBase {
  image: string;
  country: string;
  position: string;
  number: number | null;
  club: string;

  statistics: PlayerSeason[];
  stats: PlayerStat[];
}
