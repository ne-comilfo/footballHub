"use client";

import { useTeamSquad, useTeamStats } from "@/hooks/useTeams";
import QueryBoundary from "../layout/QueryBoundary";

export default function TeamStats({ id }: { id: string }) {
  const query = useTeamStats(id);
  const squad = useTeamSquad(id);

  return (
    <QueryBoundary
      query={query}
      emptyText="Нет данных о статистике команды"
      errorText="Ошибка при загрузке статистики команды"
    >
      {(stats) => (
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Сезон", value: stats.season ?? "—" },
            { label: "Матчи", value: stats.played },
            { label: "Игроки", value: squad.data?.length ?? "—" },
            { label: "Победы", value: stats.wins },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border bg-card p-5">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="mt-2 text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </section>
      )}
    </QueryBoundary>
  );
}
