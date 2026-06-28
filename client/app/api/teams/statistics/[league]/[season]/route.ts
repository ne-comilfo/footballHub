import { NextResponse } from "next/server";
import { apiFootballFetch } from "@/client/lib/apiFootball";

export async function GET(
  request: Request,
  {
    params,
  }: { params: Promise<{ id: string; league: string; season: string }> },
) {
  const { id, league, season } = await params;

  const data = await apiFootballFetch(
    `/teams/statistics?league=${league}&team=${id}&season=${season}`,
  );

  return NextResponse.json(data);
}
