export type Player = {
  id: number;
  name: string;
  image: string;
  country: string;
  club: string;
  position: string;
  age: string;
  number: string;
  foot: string;
};

export type PlayerStat = {
  label: string;
  value: string;
};

export type PlayerSeason = {
  tournament: string;
  matches: string;
  goals: string;
  assists: string;
};

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
