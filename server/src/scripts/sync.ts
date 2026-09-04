import {
  mapApiFootballPlayer,
  mapApiFootballTeam,
  mapSquad,
  type ApiFootballFixture,
  type ApiFootballLeague,
  type ApiFootballPlayer,
  type ApiFootballResponse,
  type ApiFootballSquad,
  type ApiFootballTeam,
  type ApiFootballTeamStats,
} from "@football-hub/contracts/external";

import { env } from "../config/env";
import { prisma } from "../config/prisma";
import { QuotaExhausted, apiFootball, quota } from "../services/apiFootball";

const REQUESTS_PER_TEAM = 5;
const REQUESTS_PER_PLAYER = 1;

type Task = "teams" | "players";

function log(message: string) {
  console.log(`[sync] ${message}`);
}

function parseArgs() {
  const args = process.argv.slice(2);
  const task = (args.find((a) => !a.startsWith("-")) ?? "teams") as Task;
  const limitArg = args.find((a) => a.startsWith("--limit"));
  const limit = limitArg
    ? Number(limitArg.split("=")[1] ?? args[args.indexOf(limitArg) + 1])
    : Number.POSITIVE_INFINITY;

  return {
    task,
    limit: Number.isFinite(limit) && limit > 0 ? limit : Number.POSITIVE_INFINITY,
    dryRun: args.includes("--dry-run"),
  };
}

const staleFirst = [
  { apiSyncedAt: { sort: "asc", nulls: "first" } },
  { popularity: "desc" },
] as const;

async function syncTeam(team: {
  id: string;
  name: string;
  leagueId: string | null;
}) {
  const profile = await apiFootball<ApiFootballResponse<ApiFootballTeam>>(
    `/teams?id=${team.id}`,
  );
  const mapped = profile.response[0]
    ? mapApiFootballTeam(profile.response[0])
    : null;

  let leagueId = team.leagueId;

  if (!leagueId) {
    const leagues = await apiFootball<ApiFootballResponse<ApiFootballLeague>>(
      `/leagues?team=${team.id}`,
    );

    leagueId = leagues.response[0]
      ? String(leagues.response[0].league.id)
      : null;
  }

  if (leagueId) {
    const stats = await apiFootball<{ response: ApiFootballTeamStats | null }>(
      `/teams/statistics?league=${leagueId}&team=${team.id}&season=${env.FOOTBALL_SEASON}`,
    );

    if (stats.response) {
      const value = {
        played: stats.response.fixtures.played.total,
        wins: stats.response.fixtures.wins.total,
        draws: stats.response.fixtures.draws.total,
        loses: stats.response.fixtures.loses.total,
      };

      await prisma.teamSeasonStats.upsert({
        where: {
          teamId_season: { teamId: team.id, season: env.FOOTBALL_SEASON },
        },
        create: { teamId: team.id, season: env.FOOTBALL_SEASON, ...value },
        update: value,
      });
    }
  }

  const squad = await apiFootball<ApiFootballResponse<ApiFootballSquad>>(
    `/players/squads?team=${team.id}`,
  );

  for (const player of squad.response[0] ? mapSquad(squad.response[0]) : []) {
    const value = {
      name: player.name,
      photo: player.photo,
      position: player.position ?? "Unknown",
      number: player.number,
      teamId: team.id,
    };

    await prisma.player.upsert({
      where: { id: player.id },
      create: { id: player.id, country: "Unknown", ...value },
      update: value,
    });
  }

  await syncFixtures(team.id);

  await prisma.team.update({
    where: { id: team.id },
    data: {
      leagueId,
      apiSyncedAt: new Date(),
      ...(mapped
        ? {
            venueName: mapped.venue.name,
            venueCity: mapped.venue.city,
            venueCapacity: mapped.venue.capacity,
            foundedYear: mapped.foundedYear ?? undefined,
          }
        : {}),
    },
  });
}

async function syncFixtures(teamId: string) {
  const fixtures = await apiFootball<ApiFootballResponse<ApiFootballFixture>>(
    `/fixtures?team=${teamId}&season=${env.FOOTBALL_SEASON}`,
  );

  const ids = new Set(
    fixtures.response.flatMap((f) => [
      String(f.teams.home.id),
      String(f.teams.away.id),
    ]),
  );

  const known = new Set(
    (
      await prisma.team.findMany({
        where: { id: { in: [...ids] } },
        select: { id: true },
      })
    ).map((t: { id: string }) => t.id),
  );

  for (const fixture of fixtures.response) {
    const homeTeamId = String(fixture.teams.home.id);
    const awayTeamId = String(fixture.teams.away.id);

    if (!known.has(homeTeamId) || !known.has(awayTeamId)) {
      continue;
    }

    const short = fixture.fixture.status.short;
    const status =
      short === "FT" || short === "AET" || short === "PEN"
        ? "finished"
        : short === "NS" || short === "TBD"
          ? "scheduled"
          : "live";

    const value = {
      leagueId: String(fixture.league.id),
      leagueName: fixture.league.name,
      kickoff: new Date(fixture.fixture.date),
      status,
      homeScore: fixture.goals.home,
      awayScore: fixture.goals.away,
      homeTeamId,
      awayTeamId,
    } as const;

    await prisma.match.upsert({
      where: { id: String(fixture.fixture.id) },
      create: { id: String(fixture.fixture.id), ...value },
      update: value,
    });
  }
}

async function syncPlayer(id: string) {
  const data = await apiFootball<ApiFootballResponse<ApiFootballPlayer>>(
    `/players?id=${id}&season=${env.FOOTBALL_SEASON}`,
  );

  if (!data.response[0]) {
    await prisma.player.update({
      where: { id },
      data: { apiSyncedAt: new Date() },
    });

    return;
  }

  const player = mapApiFootballPlayer(data.response[0]);

  await prisma.player.update({
    where: { id },
    data: {
      name: player.name,
      photo: player.photo,
      country: player.country,
      position: player.position,
      heightCm: player.heightCm,
      weightKg: player.weightKg,
      injured: player.injured,
      birthDate: player.birthDate ? new Date(player.birthDate) : null,
      apiSyncedAt: new Date(),
    },
  });

  for (const season of player.seasons) {
    const value = {
      appearances: season.appearances,
      goals: season.goals,
      assists: season.assists,
      leagueCountry: season.leagueCountry,
    };

    const existing = (await prisma.playerSeasonStats.findFirst({
      where: {
        playerId: id,
        season: season.season,
        leagueName: season.leagueName,
      },
      select: { id: true },
    })) as { id: string } | null;

    if (existing) {
      await prisma.playerSeasonStats.update({
        where: { id: existing.id },
        data: value,
      });
    } else {
      await prisma.playerSeasonStats.create({
        data: {
          playerId: id,
          season: season.season,
          leagueName: season.leagueName,
          ...value,
        },
      });
    }
  }
}

async function run() {
  const { task, limit, dryRun } = parseArgs();
  const perEntity = task === "teams" ? REQUESTS_PER_TEAM : REQUESTS_PER_PLAYER;

  const pending =
    task === "teams"
      ? await prisma.team.count({ where: { apiSyncedAt: null } })
      : await prisma.player.count({ where: { apiSyncedAt: null } });

  const total =
    task === "teams" ? await prisma.team.count() : await prisma.player.count();

  log(`задача: ${task}`);
  log(`всего в базе: ${total}, ни разу не синхронизировано: ${pending}`);
  log(
    `оценка: ~${perEntity} запроса на единицу, полный проход ~${total * perEntity} запросов`,
  );

  if (dryRun) {
    log("--dry-run: ничего не запрашиваю");
    return;
  }

  const entities =
    task === "teams"
      ? await prisma.team.findMany({
          orderBy: [...staleFirst],
          take: Number.isFinite(limit) ? limit : undefined,
          select: { id: true, name: true, leagueId: true },
        })
      : await prisma.player.findMany({
          orderBy: [...staleFirst],
          take: Number.isFinite(limit) ? limit : undefined,
          select: { id: true, name: true },
        });

  let done = 0;

  for (const entity of entities as { id: string; name: string; leagueId?: string | null }[]) {
    if (!quota.canSpend(perEntity)) {
      log(
        `останавливаюсь: на сегодня осталось ${quota.dailyRemaining} запросов, на следующую единицу нужно ${perEntity}`,
      );
      break;
    }

    try {
      if (task === "teams") {
        await syncTeam({
          id: entity.id,
          name: entity.name,
          leagueId: entity.leagueId ?? null,
        });
      } else {
        await syncPlayer(entity.id);
      }

      done++;
      log(
        `${done}/${entities.length} ${entity.name} — потрачено ${quota.spent}, осталось ${quota.dailyRemaining ?? "?"}`,
      );
    } catch (error) {
      if (error instanceof QuotaExhausted) {
        log(`квота кончилась: ${error.message}`);
        break;
      }

      log(`ошибка на ${entity.name}: ${String(error)}`);
    }
  }

  log(
    `готово: обработано ${done}, потрачено запросов ${quota.spent}, дневной остаток ${quota.dailyRemaining ?? "?"} из ${quota.dailyLimit ?? "?"}`,
  );
}

run()
  .catch((error) => {
    console.error("[sync] упал:", error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
