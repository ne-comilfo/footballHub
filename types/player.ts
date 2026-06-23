export interface PlayerHeroProps {
  player: Player;
  photo: string,
}

export interface Player {
  player: {
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

    birth: {
      date: string;
      place: string;
      country: string;
    };
  };

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

export type PlayerDetails = Player & {
  stats: PlayerStat[];
  seasons: PlayerSeason[];
  strengths: string[];
  news: PlayerNews[];
};
