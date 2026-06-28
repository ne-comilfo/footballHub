import { popularTeams } from "@/data/teams";
import { TeamDetails } from "@/types/team";

const baseStats = [
  { label: "Трофеи", value: "101" },
  { label: "Игроки", value: "28" },
  { label: "Победы", value: "24" },
  { label: "Матчи", value: "38" },
];

const baseSquad = [
  {
    name: "Cristiano Ronaldo",
    position: "Forward",
    image: "/images/players/ronaldo.png",
  },
  {
    name: "Lionel Messi",
    position: "Attacking midfielder",
    image: "/images/players/messi.png",
  },
  {
    name: "Neymar Jr",
    position: "Winger",
    image: "/images/players/neymar.png",
  },
  {
    name: "Lamine Yamal",
    position: "Right winger",
    image: "/images/players/yamal.png",
  },
  {
    name: "Harry Kane",
    position: "Striker",
    image: "/images/players/kane.png",
  },
  {
    name: "Matvei Safonov",
    position: "Goalkeeper",
    image: "/images/players/safonov.png",
  },
];

const baseNews = [
  {
    title: "Команда представила новую домашнюю форму",
    description:
      "Клуб показал обновленный комплект с классической основой и аккуратными деталями на воротнике.",
    image: "/images/news/real-kit.png",
  },
  {
    title: "Команда готовится к решающему отрезку сезона",
    description:
      "Тренерский штаб провел открытую тренировку перед серией важных матчей на домашнем стадионе.",
    image: "/images/news/liverpool-training.png",
  },
  {
    title: "Молодые игроки получат шанс в ближайших турах",
    description:
      "В заявку основной команды вошли несколько футболистов академии, которые ярко проявили себя на сборах.",
    image: "/images/news/barca-tour.png",
  },
];

export const teamDetails: TeamDetails[] = popularTeams.map((team) => ({
  ...team,
  stats: baseStats,
  squad: baseSquad,
  results: [
    {
      opponent: "Barcelona",
      score: "2:1",
      date: "12 May 2026",
      logo: "/images/teams/barcelona.png",
    },
    {
      opponent: "Manchester City",
      score: "1:1",
      date: "7 May 2026",
      logo: "/images/teams/man-city.png",
    },
    {
      opponent: "Bayern Munich",
      score: "3:0",
      date: "30 Apr 2026",
      logo: "/images/teams/bayern.png",
    },
  ],
  news: baseNews.map((item) => ({
    ...item,
    title: item.title.replace("Команда", team.name),
  })),
}));
