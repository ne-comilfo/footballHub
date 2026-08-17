import { jsonRoute, notFound } from "@/lib/server/handler";
import { getProvider } from "@/lib/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const player = await getProvider().getPlayer(id);

  if (!player) {
    return notFound("Игрок не найден");
  }

  return jsonRoute(async () => player);
}
