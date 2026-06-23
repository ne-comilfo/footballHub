import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const response = await fetch(
    `https://v3.football.api-sports.io/players?id=${id}&season=2024`,
    {
      method: "GET",
      headers: {
        "x-apisports-key": process.env.API_FOOTBALL_KEY!,
      },
    },
  );

  const data = await response.json();

  return NextResponse.json(data);
}
