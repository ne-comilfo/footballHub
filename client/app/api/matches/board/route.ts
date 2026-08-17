import { jsonRoute } from "@/lib/server/handler";
import { getProvider } from "@/lib/server";

export async function GET() {
  return jsonRoute(() => getProvider().getMatchesBoard());
}
