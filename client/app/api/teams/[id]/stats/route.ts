import { jsonRoute } from "@/lib/server/handler";
import { getProvider } from "@/lib/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  return jsonRoute(() => getProvider().getTeamStats(id));
}
