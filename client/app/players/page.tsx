"use client";

import QueryBoundary from "@/components/layout/QueryBoundary";
import { PaginationDemo } from "@/components/layout/Pagintation";
import PlayerCard from "@/components/players/PlayerCard";
import PlayersFilters from "@/components/players/PlayersFilters";
import { useAllPlayers } from "@/hooks/useAllPlayers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function FootballPlayersContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function getValidPage(value: string | null) {
    const page = Number(value);

    if (!Number.isInteger(page) || page < 1) {
      return "1";
    }

    return String(page);
  }

  const page = getValidPage(searchParams.get("page"));

  useEffect(() => {
    if (page !== searchParams.get("page")) {
      const params = new URLSearchParams(searchParams.toString());

      params.set("page", page);
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [page, pathname, router, searchParams]);

  const filters = {
    ...Object.fromEntries(searchParams.entries()),
    page,
  };

  const { data, error, isLoading, isFetching } = useAllPlayers(
    filters,
    searchParams.get("search") ?? "",
  );

  if (isLoading || error || !data) {
    return (
      <QueryBoundary
        isLoading={isLoading}
        loadingText="Загрузка..."
        error={error}
        errorText="Ошибка при загрузке данных"
        data={data}
        emptyText="Нет данных"
      />
    );
  }

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

      {isFetching && (
        <div className="mb-4 self-center text-lg text-muted-foreground">
          Обновляем список...
        </div>
      )}

      {!isFetching && (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((player) => (
            <PlayerCard key={player.idAPIfootball} player={player} />
          ))}

          <div className="col-span-full mt-5 flex justify-center">
            <PaginationDemo
              pages={Array.from({ length: data.totalPages }, (_, index) =>
                String(index + 1),
              )}
            />
          </div>
        </section>
      )}
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
