import { NextResponse } from "next/server";
import { theSportsDbFetch } from "@/lib/theSportsDb";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ date: string }> },
) {
  const { date } = await params;

  const data = await theSportsDbFetch(
    `/123/eventsday.php?d=${date}&s=Soccer&l=4429`,
  );

  if (!data) {
    throw new Error('Failed to get data from server')
  }

  return NextResponse.json(data);
}
