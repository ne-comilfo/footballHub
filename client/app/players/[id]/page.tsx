import type { Metadata } from "next";
import { getProvider } from "@/lib/server";
import PlayerPage from "./PlayerPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const player = await getProvider().getPlayer(id);

    return player
      ? { title: `Игроки — ${player.name}`, description: `${player.name}: клуб, позиция и статистика по сезонам.` }
      : { title: "Игроки" };
  } catch {
    return { title: "Игроки" };
  }
}

export default function Page() {
  return <PlayerPage />;
}
