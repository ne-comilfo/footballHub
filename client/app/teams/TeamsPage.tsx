"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import QueryBoundary from "@/components/layout/QueryBoundary";
import { PaginationDemo } from "@/components/layout/Pagintation";
import TeamCard from "@/components/teams/TeamCard";
import TeamsFilters from "@/components/teams/TeamsFilters";
import { useTeams } from "@/hooks/useTeams";
import { readTeamsQuery } from "@/lib/filters";

function FootballTeamsContent() {
  const searchParams = useSearchParams();
  const query = useTeams(readTeamsQuery(searchParams));

  return (
    <div className="mx-auto mt-2 mb-8 flex w-full max-w-5xl flex-col gap-8 px-4 sm:px-6">
      <section className="rounded-xl border bg-card p-6 sm:p-8">
        <p className="text-sm font-medium uppercase text-muted-foreground">
          Football Hub
        </p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          Команды
        </h1>

        <p className="mt-4 max-w-2xl text-muted-foreground">
          Выберите клуб и перейдите на страницу команды с составом, последними
          результатами, новостями и краткой статистикой.
        </p>
      </section>

      <TeamsFilters />

      {query.isFetching && !query.isPending && (
        <div className="mb-4 self-center text-lg text-muted-foreground">
          Обновляем список...
        </div>
      )}

      <QueryBoundary
        query={query}
        errorText="Ошибка при загрузке данных"
        isEmpty={(page) => page.items.length === 0}
        emptyText="Команды не найдены"
      >
        {(page) => (
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {page.items.map((team) => (
              <TeamCard key={team.id} team={team} />
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

export default function TeamsPage() {
  return (
    <Suspense fallback={null}>
      <FootballTeamsContent />
    </Suspense>
  );
}
