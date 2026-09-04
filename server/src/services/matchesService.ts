import type { Match, MatchesBoard } from "@football-hub/contracts";

import { prisma } from "../config/prisma";
import { toMatch, type MatchRecord } from "../mappers/toContract";

const BOARD_LIMIT = 5;

const MATCH_INCLUDE = {
  homeTeam: { select: { id: true, name: true, logo: true, popularity: true } },
  awayTeam: { select: { id: true, name: true, logo: true, popularity: true } },
} as const;

type RankedMatch = MatchRecord & {
  homeTeam: { popularity: number };
  awayTeam: { popularity: number };
};

export async function getMatchOfTheDay(date: string): Promise<Match | null> {
  const from = new Date(`${date}T00:00:00.000Z`);

  if (Number.isNaN(from.getTime())) {
    return null;
  }

  const to = new Date(from);

  to.setUTCDate(to.getUTCDate() + 1);

  const records = (await prisma.match.findMany({
    where: { kickoff: { gte: from, lt: to } },
    orderBy: { kickoff: "asc" },
    include: MATCH_INCLUDE,
  })) as RankedMatch[];

  if (records.length === 0) {
    return null;
  }

  const best = records.reduce((current, candidate) =>
    candidate.homeTeam.popularity + candidate.awayTeam.popularity >
    current.homeTeam.popularity + current.awayTeam.popularity
      ? candidate
      : current,
  );

  return toMatch(best);
}

export async function getMatchesBoard(): Promise<MatchesBoard> {
  const [latest, nearest] = await Promise.all([
    prisma.match.findMany({
      where: { status: "finished", kickoff: { not: null } },
      orderBy: { kickoff: "desc" },
      take: BOARD_LIMIT,
      include: MATCH_INCLUDE,
    }) as Promise<MatchRecord[]>,
    prisma.match.findMany({
      where: {
        status: { not: "finished" },
        kickoff: { gte: new Date() },
      },
      orderBy: { kickoff: "asc" },
      take: BOARD_LIMIT,
      include: MATCH_INCLUDE,
    }) as Promise<MatchRecord[]>,
  ]);

  return {
    latest: latest.map(toMatch),
    nearest: nearest.map(toMatch),
  };
}
