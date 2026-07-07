import { NextResponse } from "next/server";
import { PLAYER_TEAM_IDS } from "@/data/player-filters";
import { theSportsDbFetch } from "@/lib/theSportsDb";
import { SportsDbPlayer } from "@/types/player";

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestedTeamIds = searchParams.getAll("teamId");
  const teamIds =
    requestedTeamIds.length > 0
      ? requestedTeamIds
      : shuffle(PLAYER_TEAM_IDS).slice(0, 4);

  const squads = await Promise.all(
    teamIds.map(async (teamId) => {
      const data = await theSportsDbFetch(
        `/123/lookup_all_players.php?id=${teamId}`,
      );

      return (data.player ?? []) as SportsDbPlayer[];
    }),
  );

  return NextResponse.json({
    players: shuffle(squads.flat()),
  });
}
