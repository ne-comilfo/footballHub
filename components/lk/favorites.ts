import { latestNews } from "@/data/news";
import { playerDetails } from "@/data/player-details";
import { popularTeams } from "@/data/teams";

import {
  CalendarDays,
  Newspaper,
  Shield,
  UserRound,
} from "lucide-react";

export const favoriteSections = [
  {
    value: "teams",
    label: "Команды",
    icon: Shield,
  },
  {
    value: "players",
    label: "Игроки",
    icon: UserRound,
  },
  {
    value: "news",
    label: "Новости",
    icon: Newspaper,
  },
  {
    value: "matches",
    label: "Матчи",
    icon: CalendarDays,
  },
];

export const favoriteTeams = popularTeams.slice(0, 2);
export const favoritePlayers = playerDetails.slice(0, 2);
export const favoriteNews = latestNews.slice(0, 2);

export const favoriteMatches = [
  {
    id: 1,
    tournament: "UEFA Champions League",
    date: "24 июня, 21:00",
    home: "Real Madrid",
    away: "Manchester City",
    homeLogo: "/images/teams/real-madrid.png",
    awayLogo: "/images/teams/man-city.png",
  },
  {
    id: 2,
    tournament: "Club World Cup",
    date: "27 июня, 19:30",
    home: "Barcelona",
    away: "Bayern Munich",
    homeLogo: "/images/teams/barcelona.png",
    awayLogo: "/images/teams/bayern.png",
  },
];