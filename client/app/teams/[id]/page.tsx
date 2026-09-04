import type { Metadata } from "next";
import { getProvider } from "@/lib/server";
import TeamPage from "./TeamPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const team = await getProvider().getTeam(id);

    return team
      ? { title: `Команды — ${team.name}`, description: `${team.name}: состав, статистика и последние матчи.` }
      : { title: "Команды" };
  } catch {
    return { title: "Команды" };
  }
}

export default function Page() {
  return <TeamPage />;
}
