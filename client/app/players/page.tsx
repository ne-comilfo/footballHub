import PlayerCard from "@/components/players/PlayerCard";
import PlayersFilters from "@/components/players/PlayersFilters";
import { playerDetails } from "@/data/player-details";

export default function FootballPlayers() {
  return (
    <div className="mx-auto mb-8 mt-2 flex w-full max-w-5xl flex-col gap-8 px-4 sm:px-6">
      <section className="rounded-xl border bg-card p-6 sm:p-8">
        <p className="text-sm font-medium uppercase text-muted-foreground">
          Football Hub
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          Игроки
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Подберите игрока по стране, позиции или клубу и откройте профиль с
          краткой статистикой, формой сезона и последними заметками.
        </p>
      </section>

      <PlayersFilters />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {playerDetails.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </section>
    </div>
  );
}
