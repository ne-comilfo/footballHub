import type {
  Paginated,
  Player,
  PlayerCard,
  PlayersQuery,
} from "@football-hub/contracts";

import { prisma } from "../config/prisma";
import {
  toPlayer,
  toPlayerCard,
  type PlayerRecord,
  type PlayerSeasonRecord,
} from "../mappers/toContract";

const CARD_FIELDS = {
  id: true,
  name: true,
  photo: true,
  country: true,
  position: true,
  number: true,
  birthDate: true,
  heightCm: true,
  weightKg: true,
  injured: true,
  teamId: true,
  team: { select: { id: true, name: true } },
} as const;

const POPULAR_LIMIT = 6;

function orderBy(sort: PlayersQuery["sort"]) {
  switch (sort) {
    case "name_asc":
      return { name: "asc" } as const;
    case "age_asc":
      return { birthDate: "desc" } as const;
    case "age_desc":
      return { birthDate: "asc" } as const;
    case "club_asc":
      return { team: { name: "asc" } } as const;
    case "club_desc":
      return { team: { name: "desc" } } as const;
    default:
      return { name: "desc" } as const;
  }
}

function where(query: PlayersQuery) {
  return {
    ...(query.search
      ? { name: { contains: query.search, mode: "insensitive" as const } }
      : {}),
    ...(query.country ? { country: query.country } : {}),
    ...(query.position ? { position: query.position } : {}),
    ...(query.club ? { team: { name: query.club } } : {}),
  };
}

export async function listPlayers(
  query: PlayersQuery,
): Promise<Paginated<PlayerCard>> {
  const filter = where(query);

  const [records, totalItems] = await Promise.all([
    prisma.player.findMany({
      where: filter,
      orderBy: orderBy(query.sort),
      skip: (query.page - 1) * query.limit,
      take: query.limit,
      select: CARD_FIELDS,
    }) as Promise<PlayerRecord[]>,
    prisma.player.count({ where: filter }),
  ]);

  return {
    items: records.map(toPlayerCard),
    page: query.page,
    totalItems,
    totalPages: Math.max(Math.ceil(totalItems / query.limit), 1),
  };
}

export async function getPopularPlayers(): Promise<PlayerCard[]> {
  const records = (await prisma.player.findMany({
    where: { popularity: { gt: 0 } },
    orderBy: { popularity: "desc" },
    take: POPULAR_LIMIT,
    select: CARD_FIELDS,
  })) as PlayerRecord[];

  return records.map(toPlayerCard);
}

export async function getPlayer(id: string): Promise<Player | null> {
  const record = (await prisma.player.findUnique({
    where: { id },
    select: CARD_FIELDS,
  })) as PlayerRecord | null;

  if (!record) {
    return null;
  }

  const seasons = (await prisma.playerSeasonStats.findMany({
    where: { playerId: id },
    orderBy: { season: "desc" },
  })) as PlayerSeasonRecord[];

  return toPlayer(record, seasons);
}
