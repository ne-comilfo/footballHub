"use client";

import { TeamStat } from "@/types/team";
import { useTeamLeague, useTeamStats } from "@/hooks/useTeams";
import QueryBoundary from "../layout/QueryBoundary";

export default function TeamStats({ id }: { id: string }) {
  const { data: leagueId } = useTeamLeague(id);
  const { data, error, isLoading } = useTeamStats(leagueId ?? "", id, "2024");

  if (!data || error || isLoading) {
    <QueryBoundary
      isLoading={isLoading}
      error={error}
      data={data}
      emptyText="Нет данных о статистике команды"
      loadingText="Загрузка..."
      errorText="Ошибка при загрузке статистики команды"
    />;
  }

  const stats = [
    { label: "Сезон", value: data.league.season },
    { label: "Матчи", value: data.fixtures.played.total },
    { label: "Игроки", value: "67" },
    { label: "Победы", value: data.fixtures.wins.total },
  ];

  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">{stat.label}</p>
          <p className="mt-2 text-3xl font-bold">{stat.value}</p>
        </div>
      ))}
    </section>
  );
}
