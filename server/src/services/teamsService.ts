import type {
  Paginated,
  Team,
  TeamCard,
  TeamFixture,
  TeamStats,
  TeamsQuery,
  SquadPlayer,
} from "@football-hub/contracts";

import { prisma } from "../config/prisma";
import {
  toSquadPlayer,
  toTeam,
  toTeamCard,
  toTeamFixture,
  toTeamStats,
  type MatchRecord,
  type PlayerRecord,
  type TeamRecord,
} from "../mappers/toContract";

const CARD_FIELDS = {
  id: true,
  name: true,
  logo: true,
  country: true,
  league: true,
  stadium: true,
  foundedYear: true,
  venueName: true,
  venueCity: true,
  venueCapacity: true,
} as const;

const MATCH_INCLUDE = {
  homeTeam: { select: { id: true, name: true, logo: true } },
  awayTeam: { select: { id: true, name: true, logo: true } },
} as const;

const POPULAR_LIMIT = 6;
const FIXTURES_LIMIT = 5;

function orderBy(sort: TeamsQuery["sort"]) {
  switch (sort) {
    case "name_asc":
      return { name: "asc" } as const;
    case "name_desc":
      return { name: "desc" } as const;
    case "founded_asc":
      return { foundedYear: "asc" } as const;
    case "founded_desc":
      return { foundedYear: "desc" } as const;
    case "popularity_asc":
      return { popularity: "asc" } as const;
    default:
      return { popularity: "desc" } as const;
  }
}

function where(query: TeamsQuery) {
  return {
    ...(query.search
      ? { name: { contains: query.search, mode: "insensitive" as const } }
      : {}),
    ...(query.country ? { country: query.country } : {}),
    ...(query.competition
      ? {
          league: { contains: query.competition, mode: "insensitive" as const },
        }
      : {}),
    OR: [
      { foundedYear: null },
      { foundedYear: { gte: query.foundedFrom, lte: query.foundedTo } },
    ],
  };
}

export async function listTeams(
  query: TeamsQuery,
): Promise<Paginated<TeamCard>> {
  const filter = where(query);

  const [records, totalItems] = await Promise.all([
    prisma.team.findMany({
      where: filter,
      orderBy: orderBy(query.sort),
      skip: (query.page - 1) * query.limit,
      take: query.limit,
      select: CARD_FIELDS,
    }) as Promise<TeamRecord[]>,
    prisma.team.count({ where: filter }),
  ]);

  return {
    items: records.map(toTeamCard),
    page: query.page,
    totalItems,
    totalPages: Math.max(Math.ceil(totalItems / query.limit), 1),
  };
}

export async function getPopularTeams(): Promise<TeamCard[]> {
  const records = (await prisma.team.findMany({
    where: { popularity: { gt: 0 } },
    orderBy: { popularity: "desc" },
    take: POPULAR_LIMIT,
    select: CARD_FIELDS,
  })) as TeamRecord[];

  return records.map(toTeamCard);
}

export async function getTeam(id: string): Promise<Team | null> {
  const record = (await prisma.team.findUnique({
    where: { id },
    select: CARD_FIELDS,
  })) as TeamRecord | null;

  return record ? toTeam(record) : null;
}

export async function getTeamSquad(id: string): Promise<SquadPlayer[]> {
  const records = (await prisma.player.findMany({
    where: { teamId: id },
    orderBy: { name: "asc" },
    select: {
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
    },
  })) as PlayerRecord[];

  return records.map(toSquadPlayer);
}

export async function getTeamStats(id: string): Promise<TeamStats | null> {
  const record = (await prisma.teamSeasonStats.findFirst({
    where: { teamId: id },
    orderBy: { season: "desc" },
  })) as {
    season: number;
    played: number;
    wins: number;
    draws: number;
    loses: number;
  } | null;

  return record ? toTeamStats(record) : null;
}

export async function getTeamFixtures(id: string): Promise<TeamFixture[]> {
  const records = (await prisma.match.findMany({
    where: {
      kickoff: { not: null },
      status: "finished",
      OR: [{ homeTeamId: id }, { awayTeamId: id }],
    },
    orderBy: { kickoff: "desc" },
    take: FIXTURES_LIMIT,
    include: MATCH_INCLUDE,
  })) as (MatchRecord & { kickoff: Date })[];

  return records.map((record) => toTeamFixture(record, id));
}
