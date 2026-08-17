"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import QueryBoundary from "@/components/layout/QueryBoundary";
import { PaginationDemo } from "@/components/layout/Pagintation";
import PlayerCard from "@/components/players/PlayerCard";
import PlayersFilters from "@/components/players/PlayersFilters";
import { usePlayers } from "@/hooks/usePlayers";
import { readPlayersQuery } from "@/lib/filters";

function FootballPlayersContent() {
  const searchParams = useSearchParams();
  const query = usePlayers(readPlayersQuery(searchParams));

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

      {query.isFetching && !query.isPending && (
        <div className="mb-4 self-center text-lg text-muted-foreground">
          Обновляем список...
        </div>
      )}

      <QueryBoundary
        query={query}
        errorText="Ошибка при загрузке данных"
        isEmpty={(page) => page.items.length === 0}
        emptyText="Игроки не найдены"
      >
        {(page) => (
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {page.items.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}

            <div className="col-span-full mt-5 flex justify-center">
              <PaginationDemo totalPages={page.totalPages} />
            </div>
          </section>
        )}
      </QueryBoundary>
    </div>
  );
}

export default function FootballPlayers() {
  return (
    <Suspense fallback={null}>
      <FootballPlayersContent />
    </Suspense>
  );
}
