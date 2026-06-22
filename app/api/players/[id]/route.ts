import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const response = await fetch(
    `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`,
  );

  const data = await response.json();

  return NextResponse.json(data);
}
