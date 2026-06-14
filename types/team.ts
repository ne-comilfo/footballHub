export type Team = {
  id: number;
  name: string;
  logo: string;
  country: string;
  stadium: string;
  founded: string;
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
  stats: TeamStat[];
  squad: SquadPlayer[];
  results: TeamResult[];
  news: TeamNews[];
};
