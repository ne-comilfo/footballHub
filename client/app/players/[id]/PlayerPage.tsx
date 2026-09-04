"use client";

import { useParams } from "next/navigation";

import QueryBoundary from "@/components/layout/QueryBoundary";
import PlayerHero from "@/components/players/PlayerHero";
import PlayerNavigation from "@/components/players/PlayerNavigation";
import PlayerOverview from "@/components/players/PlayerOverview";
import PlayerSeason from "@/components/players/PlayerSeason";
import PlayerStats from "@/components/players/PlayerStats";
import { usePlayer } from "@/hooks/usePlayers";
import { playerProfileMock } from "@/data/player-profile-mock";

export default function PlayerPage() {
  const params = useParams<{ id: string }>();
  const query = usePlayer(params.id);

  return (
    <div className="mx-auto mb-8 flex w-full max-w-5xl flex-col gap-8 px-4 sm:px-6">
      <QueryBoundary query={query} errorText="Не удалось загрузить игрока">
        {(player) => (
          <>
            <PlayerHero player={player} />

            <PlayerStats
              stats={[
                { value: player.totals.goals, label: "Голы" },
                { value: player.totals.assists, label: "Ассисты" },
                { value: player.totals.matches, label: "Матчи" },
                { value: player.totals.rating ?? "N/A", label: "Рейтинг" },
              ]}
            />

            <PlayerSeason seasons={player.seasons} />
            <PlayerOverview player={playerProfileMock} />
            <PlayerNavigation />
          </>
        )}
      </QueryBoundary>
    </div>
  );
}
