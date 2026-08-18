# Переезд на собственный бэкенд

## Идея

Клиент не знает, откуда берутся данные. Он ходит только в `/api/*` внутри Next
и получает ответы в форме, описанной zod-схемами в `client/contracts/`.

```
компонент → hook → services/*Api.ts → /api/* (route handler)
                                          ↓
                                    getProvider()
                                    ↙            ↘
                        externalProvider      ownProvider
                     (TheSportsDB + API-Football)   (Express + Prisma + Neon)
```

Переключение источника — одна переменная окружения:

```bash
DATA_SOURCE=own
OWN_API_URL=http://localhost:5000/api
```

Клиентский код при этом не меняется вообще.

## Что реализовать на Express

Каждый эндпоинт должен вернуть ровно ту форму, которую описывает схема в
`client/contracts/`. Если форма разойдётся, `apiFetch` выбросит
`ApiError` с текстом «не соответствует контракту» — молча не сломается.

| Метод и путь | Ответ | Схема |
|---|---|---|
| `GET /teams?page&limit&search&country&competition&foundedFrom&foundedTo&sort` | `{ items, page, totalItems, totalPages }` | `paginatedSchema(teamCardSchema)` |
| `GET /teams/popular` | `TeamCard[]` | `teamCardSchema` |
| `GET /teams/:id` | `Team` либо 404 | `teamSchema` |
| `GET /teams/:id/squad` | `SquadPlayer[]` | `squadPlayerSchema` |
| `GET /teams/:id/stats` | `TeamStats` или `null` | `teamStatsSchema` |
| `GET /teams/:id/fixtures` | `TeamFixture[]` | `teamFixtureSchema` |
| `GET /players?page&limit&search&country&position&club&sort` | `{ items, page, totalItems, totalPages }` | `paginatedSchema(playerCardSchema)` |
| `GET /players/popular` | `PlayerCard[]` | `playerCardSchema` |
| `GET /players/:id` | `Player` либо 404 | `playerSchema` |
| `GET /matches/day?date=YYYY-MM-DD` | `Match` или `null` | `matchSchema` |
| `GET /matches/board` | `{ latest: Match[], nearest: Match[] }` | `matchesBoardSchema` |

Допустимые значения `sort`:

- команды: `popularity_desc`, `popularity_asc`, `name_asc`, `name_desc`, `founded_asc`, `founded_desc`
- игроки: `name_desc`, `name_asc`, `age_asc`, `age_desc`, `club_asc`, `club_desc`

Пустая строка в `country`, `competition`, `position`, `club` означает «фильтр не применять».

## Схема БД

Модели лежат в `server/prisma/schema.prisma`: `Team`, `Player`, `PlayerSeasonStats`,
`TeamSeasonStats`, `Match`, `News`, `User`, `Favorite` плюс энумы `MatchStatus`
(`scheduled` / `live` / `finished`) и `FavoriteKind`.

Значения энумов совпадают со строками в контрактах — маппинг один в один.

`Team.id` и `Player.id` — строковые id из API-Football (то, что сейчас приходит
как `idAPIfootball`). Если сохранить их при импорте, ссылки вида `/teams/541`
продолжат работать без переписывания.

Отдельно стоит отметить:

- `popularity Int` у команд и игроков — под сортировку `popularity_asc/desc` и
  под эндпоинты `/teams/popular`, `/players/popular`. Сейчас в `externalProvider`
  «популярность» — это захардкоженный список id в `lib/server/external/config.ts`;
  при импорте эти id получают ненулевой `popularity`.
- `Favorite` полиморфный: `kind` + `entityId` без внешнего ключа. Альтернатива —
  четыре таблицы связей, но для избранного это перебор.
- `TeamFixture` в контракте требует непустую дату, а `Match.kickoff` nullable —
  в `/teams/:id/fixtures` фильтровать `kickoff: { not: null }`.
- Поиск по имени сейчас опирается на обычный btree-индекс. `LIKE '%x%'` его не
  использует; если поиск станет медленным, включать `pg_trgm` и GIN.

### Особенности Prisma 7

Две вещи, на которых легко споткнуться:

**1. `url` больше нельзя держать в `schema.prisma`.** Он переехал в
`prisma.config.ts` (у нас уже прописан). Блок datasource теперь такой:

```prisma
datasource db {
  provider = "postgresql"
}
```

**2. `PrismaClient` требует драйвер-адаптер.** Просто `new PrismaClient()` с
прямым подключением в 7-й версии не работает. Для Neon:

```bash
pnpm --filter server add @prisma/adapter-neon @neondatabase/serverless
# либо обычный postgres-драйвер:
pnpm --filter server add @prisma/adapter-pg pg
```

```ts
// server/src/config/prisma.ts
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });

export const prisma = new PrismaClient({ adapter });
```

### Команды

```bash
cd server
pnpm exec prisma migrate dev --name init
pnpm exec prisma generate
pnpm exec prisma studio          # посмотреть, что получилось
```

## Порядок работ

1. Поднять модели в `server/prisma/schema.prisma`, прогнать `prisma migrate dev`.
2. Написать скрипт-импортёр: тянет данные тем же кодом, что лежит в
   `client/lib/server/external/`, и раскладывает в Neon. Мапперы уже приводят
   внешние DTO к доменной форме — их можно переиспользовать почти как есть.
3. Реализовать в Express эндпоинты из таблицы выше. Фильтрация, сортировка и
   пагинация уходят в SQL: `where`, `orderBy`, `skip`, `take`.
4. Поднять Express и проверить каждый эндпоинт вручную — ответ должен проходить
   соответствующую zod-схему.
5. Поставить `DATA_SOURCE=own` и `OWN_API_URL` в `client/.env.local`.
6. Убедиться, что приложение работает, и удалить `client/lib/server/external/`
   вместе с ключами внешних API из окружения.

Переезжать можно и по частям: `getProvider()` возвращает один объект целиком,
но при желании его несложно превратить в композицию — часть методов брать из
`ownProvider`, часть из `externalProvider`.

## Переменные окружения

```bash
# client/.env.local
DATA_SOURCE=external              # external | own

# нужны при DATA_SOURCE=external
API_FOOTBALL_BASE_URL=https://v3.football.api-sports.io
API_FOOTBALL_KEY=...
THE_SPORTS_DB_BASE_URL=https://www.thesportsdb.com/api/v1/json
FOOTBALL_SEASON=2024

# нужна при DATA_SOURCE=own
OWN_API_URL=http://localhost:5000/api

# нужна для серверных запросов к своим же /api/* при SSR
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```
