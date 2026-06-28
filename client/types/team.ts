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

export type SquadPlayer = {
  name: string;
  position: string;
  image: string;
};

export type TeamResult = {
  opponent: string;
  score: string;
  date: string;
  logo: string;
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
