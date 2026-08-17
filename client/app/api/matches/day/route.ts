import { jsonRoute } from "@/lib/server/handler";
import { getProvider } from "@/lib/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date") ?? "";

  return jsonRoute(() => getProvider().getMatchOfTheDay(date));
}
