import { jsonRoute, notFound } from "@/lib/server/handler";
import { getProvider } from "@/lib/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const team = await getProvider().getTeam(id);

  if (!team) {
    return notFound("Команда не найдена");
  }

  return jsonRoute(async () => team);
}
