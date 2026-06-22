export interface Team {
  id: number | string;
  name: string;
  logo: string;
  country: string;
}

export interface Player {
  id: number | string;
  name: string;
  img: string;
  country: string;
}

export interface News {
  id: number;
  title: string;
  descr: string;
  img: string;
}

export interface Scorers {
  id: number;
  name: string;
  goals: number;
}

export interface Result {
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  homeScore: number;
  awayScore: number;
  idHomeTeam: string;
  idAwayTeam: string;
  strTimestamp: string;
}
