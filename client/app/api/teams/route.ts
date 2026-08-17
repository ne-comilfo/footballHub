import { teamsQuerySchema } from "@/contracts/team";
import { jsonRoute } from "@/lib/server/handler";
import { getProvider } from "@/lib/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = teamsQuerySchema.parse(Object.fromEntries(searchParams));

  return jsonRoute(() => getProvider().listTeams(query));
}
