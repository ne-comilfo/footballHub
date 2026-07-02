import { NextResponse } from "next/server";
import { theSportsDbFetch } from "@/lib/theSportsDb";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ league: string }> },
) {
  const { league } = await params;

  const data = await theSportsDbFetch(`/123/search_all_teams.php?l=${league}`);

  if (!data) {
    throw new Error(`Failed to fetch teams`);
  }

  return NextResponse.json(data);
}
