import {
  playersQuerySchema,
} from "@football-hub/contracts";
import { jsonRoute } from "@/lib/server/handler";
import { getProvider } from "@/lib/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = playersQuerySchema.parse(Object.fromEntries(searchParams));

  return jsonRoute(() => getProvider().listPlayers(query));
}
