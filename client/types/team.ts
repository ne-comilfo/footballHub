export type Team = {
  team: {
    id: number;
    name: string;
    code: string;
    country: string;
    founded: number;
    national: boolean;
    logo: string;
  };
  venue: {
    id: number;
    name: string;
    address: string;
    city: string;
    capacity: number;
    surface: string;
    image: string;
  };
};

export type TeamStat = {
  label: string;
  value: string;
};

export type TeamCardProps = {
  idAPIfootball: string;
  strTeam: string;
  strBadge: string;
  strCountry: string;
  strStadium: string;
  intFormedYear: string;
}

export type SquadPlayer = {
  name: string;
  position: string;
  photo: string;
  id: string;
};

export type TeamResult = {
  fixture: {
    id: number;
    date: string;
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: string;
  };
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
    };
    away: {
      id: number;
      name: string;
      logo: string;
    };
  };
  goals: {
    home: number;
    away: number;
  };
};

export type TeamNews = {
  title: string;
  description: string;
  image: string;
};

export type TeamDetails = Team & {
  id: number | string;
  stats: TeamStat[];
  squad: SquadPlayer[];
  results: TeamResult[];
  news: TeamNews[];
};
