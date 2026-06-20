import { PlayerDetails } from "@/types/player";

export const playerDetails: PlayerDetails[] = [
  {
    id: 1,
    name: "Cristiano Ronaldo",
    country: "Portugal",
    club: "Al Nassr",
    position: "Forward",
    age: "41",
    number: "7",
    foot: "Right",
    image: "/images/players/ronaldo.png",
    stats: [
      { label: "Голы", value: "22" },
      { label: "Ассисты", value: "5" },
      { label: "Матчи", value: "31" },
      { label: "Рейтинг", value: "8.1" },
    ],
    seasons: [
      { tournament: "Saudi Pro League", matches: "24", goals: "18", assists: "4" },
      { tournament: "AFC Champions League", matches: "7", goals: "4", assists: "1" },
    ],
    strengths: ["Игра в штрафной", "Удар", "Лидерство"],
    news: [
      {
        title: "Роналду снова решает в концовке",
        description: "Форвард забил победный мяч после стандарта и сохранил темп в гонке бомбардиров.",
      },
      {
        title: "Тренер отмечает форму капитана",
        description: "Штаб доволен объемом работы без мяча и влиянием Роналду на молодых игроков.",
      },
    ],
  },
  {
    id: 2,
    name: "Lionel Messi",
    country: "Argentina",
    club: "Inter Miami",
    position: "Forward",
    age: "38",
    number: "10",
    foot: "Left",
    image: "/images/players/messi.png",
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
        title: "Месси набрал 30 голевых действий",
        description: "Аргентинец продолжает вести атаку Inter Miami и чаще опускается в роль плеймейкера.",
      },
      {
        title: "Inter Miami готовит ротацию",
        description: "Клуб бережно распределяет минуты лидера перед плотным календарем.",
      },
    ],
  },
  {
    id: 3,
    name: "Neymar Jr",
    country: "Brazil",
    club: "Santos",
    position: "Forward",
    age: "34",
    number: "10",
    foot: "Right",
    image: "/images/players/neymar.png",
    stats: [
      { label: "Голы", value: "9" },
      { label: "Ассисты", value: "8" },
      { label: "Матчи", value: "21" },
      { label: "Рейтинг", value: "7.9" },
    ],
    seasons: [
      { tournament: "Brasileirao", matches: "17", goals: "7", assists: "6" },
      { tournament: "Copa do Brasil", matches: "4", goals: "2", assists: "2" },
    ],
    strengths: ["Обыгрыш один в один", "Креатив", "Фолы на себе"],
    news: [
      {
        title: "Неймар вернул темп после паузы",
        description: "Атакующий игрок чаще получает мяч слева и создает моменты после смещений в центр.",
      },
      {
        title: "Santos строит атаку вокруг десятки",
        description: "Команда добавила быстрые переводы, чтобы чаще оставлять Неймара против одного защитника.",
      },
    ],
  },
  {
    id: 4,
    name: "Lamine Yamal",
    country: "Spain",
    club: "Barcelona",
    position: "Winger",
    age: "18",
    number: "19",
    foot: "Left",
    image: "/images/players/yamal.png",
    stats: [
      { label: "Голы", value: "12" },
      { label: "Ассисты", value: "15" },
      { label: "Матчи", value: "36" },
      { label: "Рейтинг", value: "8.0" },
    ],
    seasons: [
      { tournament: "La Liga", matches: "29", goals: "9", assists: "12" },
      { tournament: "Champions League", matches: "7", goals: "3", assists: "3" },
    ],
    strengths: ["Скорость", "Левый фланг", "Передачи вразрез"],
    news: [
      {
        title: "Ямаль остается главным источником ширины",
        description: "Вингер регулярно растягивает оборону и ускоряет атаки после диагоналей.",
      },
      {
        title: "Barcelona бережет минуты таланта",
        description: "Штаб контролирует нагрузку, но сохраняет игрока в ключевых матчах.",
      },
    ],
  },
  {
    id: 5,
    name: "Matvei Safonov",
    country: "Russia",
    club: "PSG",
    position: "Goalkeeper",
    age: "27",
    number: "39",
    foot: "Right",
    image: "/images/players/safonov.png",
    stats: [
      { label: "Сухие матчи", value: "11" },
      { label: "Сейвы", value: "78" },
      { label: "Матчи", value: "25" },
      { label: "Рейтинг", value: "7.4" },
    ],
    seasons: [
      { tournament: "Ligue 1", matches: "19", goals: "0", assists: "0" },
      { tournament: "Coupe de France", matches: "6", goals: "0", assists: "0" },
    ],
    strengths: ["Игра ногами", "Реакция", "Выходы"],
    news: [
      {
        title: "Сафонов уверенно провел серию матчей",
        description: "Вратарь добавил стабильности на линии и чаще начинает атаки коротким пасом.",
      },
      {
        title: "PSG меняет структуру билд-апа",
        description: "Команда активнее использует голкипера как дополнительного игрока первой линии.",
      },
    ],
  },
  {
    id: 6,
    name: "Harry Kane",
    country: "England",
    club: "Bayern Munich",
    position: "Forward",
    age: "32",
    number: "9",
    foot: "Right",
    image: "/images/players/kane.png",
    stats: [
      { label: "Голы", value: "28" },
      { label: "Ассисты", value: "9" },
      { label: "Матчи", value: "34" },
      { label: "Рейтинг", value: "8.3" },
    ],
    seasons: [
      { tournament: "Bundesliga", matches: "27", goals: "23", assists: "7" },
      { tournament: "Champions League", matches: "7", goals: "5", assists: "2" },
    ],
    strengths: ["Завершение", "Игра спиной", "Длинный пас"],
    news: [
      {
        title: "Кейн держит высокий темп результативности",
        description: "Нападающий полезен не только в штрафной, но и в развитии атак через опускания.",
      },
      {
        title: "Bayern чаще ищет Кейна ранними передачами",
        description: "Полузащита быстрее доставляет мяч форварду между линиями и за спины защитникам.",
      },
    ],
  },
];
