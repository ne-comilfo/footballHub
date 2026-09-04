import type {
  Paginated,
  Player,
  PlayerCard,
  PlayersQuery,
  TopScorer,
} from "@football-hub/contracts";

import { env } from "../config/env";
import { prisma } from "../config/prisma";
import {
  toPlayer,
  toPlayerCard,
  type PlayerRecord,
  type PlayerSeasonRecord,
} from "../mappers/toContract";

export const PLAYER_CARD_FIELDS = {
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
      select: PLAYER_CARD_FIELDS,
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
    select: PLAYER_CARD_FIELDS,
  })) as PlayerRecord[];

  return records.map(toPlayerCard);
}

export async function getPlayer(id: string): Promise<Player | null> {
  const record = (await prisma.player.findUnique({
    where: { id },
    select: PLAYER_CARD_FIELDS,
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

const TOP_SCORERS_LIMIT = 10;

export async function getTopScorers(): Promise<TopScorer[]> {
  const totals = await prisma.playerSeasonStats.groupBy({
    by: ["playerId"],
    where: { season: env.FOOTBALL_SEASON, goals: { gt: 0 } },
    _sum: { goals: true, assists: true, appearances: true },
    orderBy: { _sum: { goals: "desc" } },
    take: TOP_SCORERS_LIMIT,
  });

  if (totals.length === 0) {
    return [];
  }

  const players = (await prisma.player.findMany({
    where: { id: { in: totals.map((row) => row.playerId) } },
    select: {
      id: true,
      name: true,
      photo: true,
      teamId: true,
      team: { select: { id: true, name: true } },
    },
  })) as {
    id: string;
    name: string;
    photo: string;
    teamId: string | null;
    team: { id: string; name: string } | null;
  }[];

  const byId = new Map(players.map((player) => [player.id, player]));

  return totals.flatMap((row) => {
    const player = byId.get(row.playerId);

    if (!player) {
      return [];
    }

    return [
      {
        id: player.id,
        name: player.name,
        photo: player.photo,
        goals: row._sum.goals ?? 0,
        assists: row._sum.assists ?? 0,
        appearances: row._sum.appearances ?? 0,
        club: {
          id: player.team?.id ?? player.teamId,
          name: player.team?.name ?? "Unknown",
        },
      },
    ];
  });
}
