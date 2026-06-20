import PlayerHero from "@/components/players/PlayerHero";
import PlayerNavigation from "@/components/players/PlayerNavigation";
import PlayerOverview from "@/components/players/PlayerOverview";
import PlayerSeason from "@/components/players/PlayerSeason";
import PlayerStats from "@/components/players/PlayerStats";
import { playerDetails } from "@/data/player-details";

type PlayerPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PlayerPage({ params }: PlayerPageProps) {
  const { id } = await params;
  const player =
    playerDetails.find((item) => item.id === Number(id)) ?? playerDetails[0];

  return (
    <div className="mx-auto mb-8 flex w-full max-w-5xl flex-col gap-8 px-4 sm:px-6">
      <PlayerHero player={player} />
      <PlayerStats stats={player.stats} />
      <PlayerSeason seasons={player.seasons} />
      <PlayerOverview player={player} />
      <PlayerNavigation />
    </div>
  );
}
