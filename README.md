<h1 align="left">Football Hub</h1>

<p align="left">
  Футбольный портал: команды, игроки, матчи и статистика европейского футбола.<br>
  Интерфейс на русском языке, код — на английском.
</p>

<p align="left">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js%2016-000000?style=flat&logo=next.js&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React%2019-20232A?style=flat&logo=react&logoColor=61DAFB">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white">
  <img alt="Express" src="https://img.shields.io/badge/Express%205-000000?style=flat&logo=express&logoColor=white">
  <img alt="Prisma" src="https://img.shields.io/badge/Prisma%207-2D3748?style=flat&logo=prisma&logoColor=white">
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind%20CSS%204-06B6D4?style=flat&logo=tailwindcss&logoColor=white">
</p>

<p align="left">
  <a href="https://ne-com1lfo.vercel.app/">
    <img src="https://img.shields.io/badge/⚽_Football_Hub-Открыть_сайт-16a34a?style=for-the-badge&labelColor=0b1220" alt="Открыть Football Hub" />
  </a>
</p>

---

## О проекте

Football Hub начинался как витрина поверх чужих REST API — TheSportsDB и API-Football.
Сейчас у него собственный бэкенд на Express и PostgreSQL, а внешние источники остались
только там, где без них не обойтись.

Три решения, вокруг которых собран весь проект:

**Единый контракт.** Доменные модели описаны zod-схемами в отдельном пакете
`packages/contracts`, типы выводятся из схем через `z.infer`. Один и тот же файл
импортируют клиент, сервер и скрипты импорта, поэтому тип и рантайм-проверка не могут
разойтись: Express валидирует ответ перед отправкой, клиент — перед тем как положить
его в кеш.

**Подменяемый источник данных.** Между приложением и данными стоит интерфейс
`FootballDataProvider` с двумя реализациями — своя база и внешние API. Какая работает,
решает переменная окружения; компоненты об этом не знают и переезд с чужого API на свой
не потребовал переписывать ни одной страницы.

**Импорт под квоту.** У API-Football на бесплатном тарифе около сотни запросов в сутки,
поэтому синхронизация не «выкачивает всё», а читает остаток квоты из заголовков ответа,
берёт самые давно обновлявшиеся записи и останавливается заранее.

## Возможности

- ⚽ **Матч дня, ближайшие игры и результаты** — в реальном времени, минуя базу
- 🏟️ **Каталог команд** с фильтрами по стране, лиге и году основания
- 👟 **Каталог игроков** с фильтрами по позиции, клубу и стране
- 📊 **Страницы команды и игрока** — состав, статистика сезона, последние матчи
- 🥅 **Топ бомбардиров** по данным собственной базы
- ⭐ **Избранное** — сердечко на каждой карточке, база как единственный источник истины
- 👤 **Личный кабинет** с регистрацией, входом и списками избранного
- 🌗 **Тёмная и светлая темы**, адаптивная вёрстка

## Технологии

|                                |                                                                   |
| ------------------------------ | ----------------------------------------------------------------- |
| **Next.js 16**                 | App Router, серверные компоненты, route handlers как прокси к API |
| **React 19**                   | UI-слой                                                           |
| **TypeScript strict**          | во всех трёх пакетах монорепозитория                              |
| **TanStack Query v5**          | серверный стейт, кеш, оптимистичные обновления избранного         |
| **Zod 4**                      | контракты: типы и рантайм-валидация из одного источника           |
| **Tailwind CSS 4 + shadcn/ui** | дизайн-токены и контролы поверх `@base-ui/react`                  |
| **Express 5**                  | собственный HTTP API                                              |
| **Prisma 7 + PostgreSQL**      | доступ к данным и миграции, база на Neon                          |
| **jsonwebtoken / jose**        | подпись токенов на сервере, проверка в middleware Next            |
| **pnpm workspaces**            | монорепозиторий из трёх пакетов                                   |
| **GitHub Actions**             | lint, typecheck и сборка на каждый push и pull request            |

## Быстрый старт

Сайт открыт — чтобы посмотреть, как всё устроено, клонировать ничего не нужно.
Дальше — про локальную разработку.

Понадобятся Node 22, pnpm 10 и база PostgreSQL (хватит бесплатного проекта на
[Neon](https://neon.com)).

```bash
git clone https://github.com/ne-comilfo/footballHub.git
cd footballHub

cp client/.env.example client/.env.local
cp server/.env.example server/.env
# заполнить DATABASE_URL и одинаковый JWT_SECRET в обоих файлах

pnpm setup          # install + сборка контрактов + prisma generate
pnpm db:migrate     # создать таблицы
pnpm db:import      # наполнить справочник из TheSportsDB
pnpm dev
```

Клиент поднимется на [http://localhost:3000](http://localhost:3000), API — на `:5000`.

### Скрипты

| Команда                                       | Описание                                             |
| --------------------------------------------- | ---------------------------------------------------- |
| `pnpm dev`                                    | клиент, сервер и watch-сборка контрактов параллельно |
| `pnpm setup`                                  | зависимости, сборка контрактов, `prisma generate`    |
| `pnpm db:migrate`                             | применить миграции и перегенерировать клиент Prisma  |
| `pnpm db:import`                              | наполнить базу справочником из TheSportsDB           |
| `pnpm db:sync`                                | подтянуть данные из API-Football под дневную квоту   |
| `pnpm db:studio`                              | Prisma Studio                                        |
| `pnpm lint` · `pnpm typecheck` · `pnpm build` | те же три шага, что и в CI                           |

## Структура

```
client/
├── app/            маршруты App Router и route handlers в app/api/*
├── components/     компоненты по страницам: home, teams, players, lk, auth, ui
├── hooks/          обёртки useQuery: useTeams, usePlayers, useFixtures, ...
├── services/       fetch-функции к /api/*
├── lib/
│   ├── auth/       куки, проверка токена, прокси к Express
│   └── server/     провайдер данных: own/ и external/
└── middleware.ts   прозрачное обновление access-токена

server/
├── routes/         пути и middleware
├── controllers/    разбор запроса и формирование ответа
├── services/       Prisma и внешние API, про HTTP не знают
├── mappers/        Prisma-модель → контракт
├── middleware/     авторизация, rate limit, обработка ошибок
└── scripts/        import.ts и sync.ts

packages/contracts/ zod-схемы и выведенные из них типы
```

## Страницы

| Маршрут                      | Описание                                                        |
| ---------------------------- | --------------------------------------------------------------- |
| `/`                          | Главная: матч дня, популярные команды и игроки, топ бомбардиров |
| `/teams` · `/teams/[id]`     | Каталог команд и страница команды                               |
| `/players` · `/players/[id]` | Каталог игроков и страница игрока                               |
| `/news`                      | Раздел новостей — пока закрыт баннером                          |
| `/lk`                        | Личный кабинет и избранное                                      |
| `/auth`                      | Вход и регистрация                                              |
| `/about`                     | О проекте                                                       |

## Как ходят данные

Клиент никогда не обращается к внешним API напрямую — иначе ключ API-Football утёк бы
в браузер. Все запросы идут через route handlers Next, а те спрашивают провайдера:

```
компонент → hook → services/*Api.ts → /api/* → getProvider()
                                                 ├── own      → Express → PostgreSQL
                                                 └── external → TheSportsDB / API-Football
```

Сейчас работает гибрид: справочные данные берутся из своей базы, а матчи — напрямую из
TheSportsDB, потому что счёт меняется по ходу игры и снимок в базе врал бы. Заменить
гибрид на полностью свои данные — это поменять одну функцию `getProvider`.

## API

Express слушает на `/api`. Публичные ручки читают справочник, защищённые требуют
access-токен из httpOnly-куки.

**Команды**

```http
GET /api/teams?page=&limit=&search=&country=&competition=&foundedFrom=&foundedTo=&sort=
GET /api/teams/popular
GET /api/teams/{id}
GET /api/teams/{id}/squad
GET /api/teams/{id}/stats
GET /api/teams/{id}/fixtures
```

**Игроки**

```http
GET /api/players?page=&limit=&search=&position=&club=&country=&sort=
GET /api/players/popular
GET /api/players/top-scorers
GET /api/players/{id}
```

**Матчи**

```http
GET /api/matches/day
GET /api/matches/board
```

**Аккаунт и избранное**

```http
POST   /api/auth/register        { email, password }
POST   /api/auth/login           { email, password }
POST   /api/auth/refresh
POST   /api/auth/logout
GET    /api/auth/me

GET    /api/favorites
POST   /api/favorites            { kind, entityId }
DELETE /api/favorites/{kind}/{entityId}
```

### Модели данных

<details>
<summary><b>Список с пагинацией</b></summary>

```jsonc
{
  "items": [],
  "page": 1,
  "totalItems": 240,
  "totalPages": 27,
}
```

Обёртка одна на все каталоги — `paginatedSchema(item)` из контрактов.

</details>

<details>
<summary><b>Команда</b></summary>

```jsonc
{
  "id": "133602",
  "name": "Zenit",
  "logo": "https://.../zenit.png",
  "country": "Russia",
  "league": "Russian Premier League",
  "stadium": "Gazprom Arena",
  "foundedYear": 1925,
  "venue": {
    "name": "Gazprom Arena",
    "city": "Saint Petersburg",
    "capacity": 68134,
  },
}
```

</details>

<details>
<summary><b>Игрок</b></summary>

```jsonc
{
  "id": "34145937",
  "name": "Alexander Sobolev",
  "photo": "https://.../player.png",
  "country": "Russia",
  "position": "Attacker",
  "number": "9",
  "age": 29,
  "club": { "id": "133602", "name": "Zenit" },
  "birthDate": "1997-03-07",
  "heightCm": 190,
  "weightKg": 82,
  "injured": false,
  "totals": { "goals": 12, "assists": 4, "matches": 27, "rating": 6.9 },
  "seasons": [
    {
      "leagueName": "Premier League",
      "leagueCountry": "Russia",
      "season": 2025,
      "appearances": 27,
      "goals": 12,
      "assists": 4,
    },
  ],
}
```

Карточка в каталоге — это те же поля без `seasons` и `totals`: схема детальной
страницы расширяет схему карточки.

</details>

<details>
<summary><b>Матч</b></summary>

```jsonc
{
  "id": "2052341",
  "league": "Russian Premier League",
  "kickoff": "2026-09-04T18:00:00.000Z",
  "status": "scheduled",
  "home": { "id": "133602", "name": "Zenit", "logo": "...", "score": null },
  "away": { "id": "133604", "name": "Spartak", "logo": "...", "score": null },
}
```

`status` — одно из `scheduled`, `live`, `finished`. Табло матчей приходит парой
списков: `latest` и `nearest`. Матчи берутся из TheSportsDB и в базе не кешируются.

</details>

## Авторизация

Пара токенов: access — JWT на 15 минут, refresh — случайные 32 байта, причём в базе
хранится только его хеш. Оба лежат в httpOnly-куках, JavaScript их не видит.

Пароли хешируются scrypt из встроенного `node:crypto`. Параметры записаны в саму строку
хеша, поэтому при их ужесточении старые пароли продолжат проверяться по своим.

Refresh ротируется при каждом обмене. Если предъявлен уже использованный токен, он
считается украденным и вся цепочка токенов пользователя гасится.

Протухший access обновляется в `middleware.ts` — клиентский код про это не знает,
никаких интерцепторов и гонок при параллельных запросах. Проверяет подпись сам Next
через `jose`, поэтому на каждый рендер в Express ходить не нужно — и потому `JWT_SECRET`
обязан совпадать на обеих площадках.

Регистрация и вход ограничены по количеству попыток на адрес почты, а не на IP: Express
за прокси видит один и тот же адрес фронтенда.

## Импорт данных

| Скрипт           | Что делает                                                         |
| ---------------- | ------------------------------------------------------------------ |
| `pnpm db:import` | разовое наполнение справочника командами и игроками из TheSportsDB |
| `pnpm db:sync`   | догрузка деталей и статистики из API-Football порциями             |

`db:sync` читает остаток квоты прямо из заголовков `x-ratelimit-requests-remaining`,
сортирует записи по `apiSyncedAt` (сначала те, что не обновлялись дольше всех) и
останавливается, оставив небольшой запас. Прерванный прогон продолжится со следующего
запуска — состояние живёт в самой базе, а не в скрипте.

## Деплой

| Часть  | Где    | Почему                                                |
| ------ | ------ | ----------------------------------------------------- |
| клиент | Vercel | родная площадка для Next.js                           |
| сервер | Render | нужен долгоживущий процесс, которого нет в serverless |
| база   | Neon   | PostgreSQL с бесплатным тарифом                       |

Сервер описан в `render.yaml` и поднимается как Blueprint: команды сборки и запуска
приходят из репозитория, а секреты с `sync: false` задаются в дашборде.

## Разработка

Ветки с префиксами `feature/`, `fix/` и `refactor/`, изменения вливаются в `main` через
pull request. Husky и lint-staged прогоняют ESLint и Prettier на изменённых файлах,
GitHub Actions — install, lint, typecheck и сборку на каждый push и PR.

### Что дальше

- перенос матчей в свою базу с фоновым обновлением вместо разового скрипта
- новости из реальных источников вместо закрытого раздела
- серверный рендеринг каталогов вместо `"use client"` — ради SEO
- тесты на мапперы, контракты и фильтры

<p align="center">
  <sub>Football Hub · Grigoriy Malyshev · 2026</sub>
</p>
