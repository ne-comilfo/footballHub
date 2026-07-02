import { NextResponse } from "next/server";
import { apiFootballFetch } from "@/lib/apiFootball";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ teamId: string }> },
) {
  const { teamId } = await params;

  const data = await apiFootballFetch(`/players/squads?team=${teamId}`);

  return NextResponse.json(data);
}
