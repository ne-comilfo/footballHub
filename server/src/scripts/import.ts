import {
  POPULAR_PLAYER_IDS,
  POPULAR_TEAM_IDS,
  SQUAD_TEAM_IDS,
  TEAM_LEAGUES,
  mapSportsDbEvent,
  mapSportsDbPlayer,
  mapSportsDbTeam,
  type SportsDbEvent,
  type SportsDbPlayer,
  type SportsDbTeam,
} from "@football-hub/contracts/external";

import { prisma } from "../config/prisma";
import { sportsDb, sportsDbPlayer } from "../services/sportsDb";

const MATCH_DAYS_BACK = 3;
const MATCH_DAYS_FORWARD = 3;

function log(message: string) {
  console.log(`[import] ${message}`);
}

function dayRange(back: number, forward: number) {
  const formatter = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Moscow",
  });

  const days: string[] = [];

  for (let offset = -back; offset <= forward; offset++) {
    const date = new Date();

    date.setDate(date.getDate() + offset);
    days.push(formatter.format(date));
  }

  return days;
}

async function loadRawTeams(): Promise<SportsDbTeam[]> {
  const leagues = await Promise.all(
    TEAM_LEAGUES.map((league) =>
      sportsDb<{ teams: SportsDbTeam[] | null }>(
        `/search_all_teams.php?l=${encodeURIComponent(league.replace(/ /g, "_"))}`,
      ),
    ),
  );

  const extra = await Promise.all(
    POPULAR_TEAM_IDS.map((id) =>
      sportsDb<{ teams: SportsDbTeam[] | null }>(`/lookupteam.php?id=${id}`),
    ),
  );

  const all = [...leagues, ...extra].flatMap((chunk) => chunk.teams ?? []);
  const unique = new Map<string, SportsDbTeam>();

  for (const team of all) {
    if (team.idAPIfootball) {
      unique.set(team.idAPIfootball, team);
    }
  }

  return [...unique.values()];
}

async function importTeams(rawTeams: SportsDbTeam[]) {
  let saved = 0;

  for (const raw of rawTeams) {
    const team = mapSportsDbTeam(raw);

    if (!team) {
      continue;
    }

    const popularIndex = raw.idTeam
      ? POPULAR_TEAM_IDS.indexOf(raw.idTeam)
      : -1;
    const popularity =
      popularIndex === -1 ? 0 : POPULAR_TEAM_IDS.length - popularIndex;

    const data = {
      name: team.name,
      logo: team.logo,
      country: team.country,
      league: team.league,
      stadium: team.stadium,
      foundedYear: team.foundedYear,
      venueName: team.stadium,
      popularity,
    };

    await prisma.team.upsert({
      where: { id: team.id },
      create: { id: team.id, ...data },
      update: data,
    });

    saved++;
  }

  log(`команд сохранено: ${saved}`);
}

async function importPlayers(teamIdBySportsDbId: Map<string, string>) {
  const squads = await Promise.all(
    SQUAD_TEAM_IDS.map((teamId) =>
      sportsDb<{ player: SportsDbPlayer[] | null }>(
        `/lookup_all_players.php?id=${teamId}`,
      ),
    ),
  );

  const popular = await Promise.all(
    POPULAR_PLAYER_IDS.map((id) =>
      sportsDbPlayer<{ players: SportsDbPlayer[] | null }>(
        `/lookupplayer.php?id=${id}`,
      ),
    ),
  );

  const popularIds = new Set<string>();

  for (const chunk of popular) {
    for (const raw of chunk.players ?? []) {
      if (raw.idAPIfootball) {
        popularIds.add(raw.idAPIfootball);
      }
    }
  }

  const rawPlayers = [...squads, ...popular].flatMap(
    (chunk) => ("player" in chunk ? chunk.player : chunk.players) ?? [],
  );

  const unique = new Map<string, SportsDbPlayer>();

  for (const raw of rawPlayers) {
    if (raw.idAPIfootball) {
      unique.set(raw.idAPIfootball, raw);
    }
  }

  let saved = 0;
  let withoutTeam = 0;

  for (const raw of unique.values()) {
    const player = mapSportsDbPlayer(raw);

    if (!player) {
      continue;
    }

    const teamId = raw.idTeam
      ? (teamIdBySportsDbId.get(raw.idTeam) ?? null)
      : null;

    if (!teamId) {
      withoutTeam++;
    }

    const data = {
      name: player.name,
      photo: player.photo,
      country: player.country,
      position: player.position,
      number: player.number,
      birthDate: raw.dateBorn ? new Date(raw.dateBorn) : null,
      popularity: popularIds.has(player.id) ? 10 : 0,
      teamId,
    };

    await prisma.player.upsert({
      where: { id: player.id },
      create: { id: player.id, ...data },
      update: data,
    });

    saved++;
  }

  log(`игроков сохранено: ${saved} (без команды: ${withoutTeam})`);
}

async function importMatches(teamIdBySportsDbId: Map<string, string>) {
  const days = dayRange(MATCH_DAYS_BACK, MATCH_DAYS_FORWARD);

  const responses = await Promise.all(
    days.map((date) =>
      sportsDb<{ events: SportsDbEvent[] | null }>(
        `/eventsday.php?d=${date}&s=Soccer`,
      ),
    ),
  );

  const events = responses.flatMap((response) => response.events ?? []);

  let saved = 0;
  let skipped = 0;

  for (const rawEvent of events) {
    const match = mapSportsDbEvent(rawEvent);

    if (!match) {
      skipped++;
      continue;
    }

    const homeTeamId = teamIdBySportsDbId.get(rawEvent.idHomeTeam ?? "");
    const awayTeamId = teamIdBySportsDbId.get(rawEvent.idAwayTeam ?? "");

    if (!homeTeamId || !awayTeamId) {
      skipped++;
      continue;
    }

    const data = {
      leagueName: match.league,
      kickoff: match.kickoff ? new Date(match.kickoff) : null,
      status: match.status,
      homeScore: match.home.score,
      awayScore: match.away.score,
      homeTeamId,
      awayTeamId,
    };

    await prisma.match.upsert({
      where: { id: match.id },
      create: { id: match.id, ...data },
      update: data,
    });

    saved++;
  }

  log(
    `матчей сохранено: ${saved}, пропущено (команд нет в базе): ${skipped}`,
  );
}

async function main() {
  const only = process.argv[2];

  log("тяну справочник команд...");

  const rawTeams = await loadRawTeams();
  const teamIdBySportsDbId = new Map<string, string>();

  for (const raw of rawTeams) {
    if (raw.idTeam && raw.idAPIfootball) {
      teamIdBySportsDbId.set(raw.idTeam, raw.idAPIfootball);
    }
  }

  log(`получено команд: ${rawTeams.length}`);

  if (!only || only === "teams") {
    await importTeams(rawTeams);
  }

  if (!only || only === "players") {
    await importPlayers(teamIdBySportsDbId);
  }

  if (!only || only === "matches") {
    await importMatches(teamIdBySportsDbId);
  }

  log("готово");
  log(
    "статистика сезонов (TeamSeasonStats, PlayerSeasonStats) не импортируется: " +
      "она требует по два запроса к API-Football на каждую команду",
  );
}

main()
  .catch((error) => {
    console.error("[import] упал:", error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
