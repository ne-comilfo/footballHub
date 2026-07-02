"use client";

import TeamCard from "@/components/teams/TeamCard";
import TeamsFilters from "@/components/teams/TeamsFilters";

import QueryBoundary from "@/components/layout/QueryBoundary";
import { useAllTeams } from "@/hooks/useAllTeams";

export default function FootballTeams() {
  const { data, error, isLoading } = useAllTeams({});

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
    <div className="mx-auto mb-8 flex w-full max-w-5xl flex-col gap-8 px-4 sm:px-6 mt-2">
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

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((team) => (
          <TeamCard key={team.idAPIfootball} team={team} />
        ))}
      </section>
    </div>
  );
}
