import { NextResponse } from "next/server";
import { apiFootballFetch } from "@/lib/apiFootball";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const data = await apiFootballFetch(`/players?id=${id}&season=2024`);

  return NextResponse.json(data);
}
