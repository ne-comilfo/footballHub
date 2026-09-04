import type {
  FavoriteInput,
  Favorites,
  SupportedFavoriteKind,
} from "@football-hub/contracts";

import { prisma } from "../config/prisma";
import { HttpError } from "../middleware/errorHandler";
import {
  toPlayerCard,
  toTeamCard,
  type PlayerRecord,
  type TeamRecord,
} from "../mappers/toContract";
import { PLAYER_CARD_FIELDS } from "./playersService";
import { TEAM_CARD_FIELDS } from "./teamsService";

export async function getFavorites(userId: string): Promise<Favorites> {
  const rows = await prisma.favorite.findMany({
    where: { userId, kind: { in: ["team", "player"] } },
    orderBy: { createdAt: "desc" },
    select: { kind: true, entityId: true },
  });

  const teamIds = rows
    .filter((row) => row.kind === "team")
    .map((row) => row.entityId);
  const playerIds = rows
    .filter((row) => row.kind === "player")
    .map((row) => row.entityId);

  const [teams, players] = await Promise.all([
    teamIds.length
      ? (prisma.team.findMany({
          where: { id: { in: teamIds } },
          select: TEAM_CARD_FIELDS,
        }) as Promise<TeamRecord[]>)
      : Promise.resolve([] as TeamRecord[]),
    playerIds.length
      ? (prisma.player.findMany({
          where: { id: { in: playerIds } },
          select: PLAYER_CARD_FIELDS,
        }) as Promise<PlayerRecord[]>)
      : Promise.resolve([] as PlayerRecord[]),
  ]);

  const order = (ids: string[]) => new Map(ids.map((id, index) => [id, index]));
  const teamOrder = order(teamIds);
  const playerOrder = order(playerIds);

  return {
    teams: teams
      .sort((a, b) => (teamOrder.get(a.id) ?? 0) - (teamOrder.get(b.id) ?? 0))
      .map(toTeamCard),
    players: players
      .sort(
        (a, b) => (playerOrder.get(a.id) ?? 0) - (playerOrder.get(b.id) ?? 0),
      )
      .map(toPlayerCard),
  };
}

async function assertEntityExists(input: FavoriteInput) {
  const exists =
    input.kind === "team"
      ? await prisma.team.count({ where: { id: input.entityId } })
      : await prisma.player.count({ where: { id: input.entityId } });

  if (exists === 0) {
    throw new HttpError(
      404,
      input.kind === "team" ? "Команда не найдена" : "Игрок не найден",
    );
  }
}

export async function addFavorite(userId: string, input: FavoriteInput) {
  await assertEntityExists(input);

  await prisma.favorite.upsert({
    where: {
      userId_kind_entityId: {
        userId,
        kind: input.kind,
        entityId: input.entityId,
      },
    },
    create: { userId, kind: input.kind, entityId: input.entityId },
    update: {},
  });
}

export async function removeFavorite(
  userId: string,
  kind: SupportedFavoriteKind,
  entityId: string,
) {
  await prisma.favorite.deleteMany({ where: { userId, kind, entityId } });
}
