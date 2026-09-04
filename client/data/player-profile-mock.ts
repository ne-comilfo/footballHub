import { PlayerDetails } from "@/types/player";

export const playerProfileMock: PlayerDetails = {
  id: 2,
  name: "Lionel Messi",
  country: "Argentina",
  club: "Inter Miami",
  position: "Forward",
  age: "38",
  number: "10",
  foot: "Left",
  image: "/images/placeholder.png",
  stats: [
    { label: "Голы", value: "16" },
    { label: "Ассисты", value: "14" },
    { label: "Матчи", value: "27" },
    { label: "Рейтинг", value: "8.5" },
  ],
  seasons: [
    { tournament: "MLS", matches: "22", goals: "13", assists: "12" },
    { tournament: "Leagues Cup", matches: "5", goals: "3", assists: "2" },
  ],
  strengths: ["Пас между линиями", "Дриблинг", "Стандарты"],
  news: [
    {
      title: "Новости в доработке",
      description: "Пока нет возможности подключать API для новостей",
    },
    {
      title: "Новости пока в доработке",
      description: "Но в будущем буду расширять функционал",
    },
  ],
};

export const favoritePlayersMock = [playerProfileMock];
