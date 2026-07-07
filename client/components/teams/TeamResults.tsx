import Image from "next/image";

import { TeamResult } from "@/types/team";

import SectionTitle from "./SectionTitle";
import { useTeamFixtures } from "@/hooks/useFixtures";
import QueryBoundary from "../layout/QueryBoundary";

export default function TeamResults({ teamId }: { teamId: string }) {
  const { data, isLoading, error } = useTeamFixtures(teamId);

  if (!data || isLoading || error) {
    return (
      <QueryBoundary
        isLoading={isLoading}
        error={error}
        data={data}
        emptyText="Нет данных"
        loadingText="Загрузка..."
        errorText="Не удалось загрузить игроков команды"
      />
    );
  }

  const results = data;

  return (
    <section className="space-y-4">
      <SectionTitle>Последние результаты</SectionTitle>
      <div className="grid gap-3">
        {results.map((match: TeamResult) => {
          const date = new Date(match.fixture.date);
          const isCurrentTeamHome = String(match.teams.home.id) === teamId;
          const opponent = isCurrentTeamHome ? match.teams.away : match.teams.home;
          const currentTeamScore = isCurrentTeamHome
            ? match.goals.home
            : match.goals.away;
          const opponentScore = isCurrentTeamHome
            ? match.goals.away
            : match.goals.home;

          const formatted = new Intl.DateTimeFormat("ru-RU", {
            timeZone: "Europe/Moscow",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }).format(date);

          return (
            <div
              key={`${match.fixture.id}`}
              className="grid gap-4 rounded-xl border bg-card p-4 sm:grid-cols-[1fr_auto_auto] sm:items-center"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={opponent.logo}
                  alt={opponent.name}
                  width={44}
                  height={44}
                  className="object-contain"
                />
                <div>
                  <p className="text-sm text-muted-foreground">Соперник</p>
                  <h3 className="font-semibold">{opponent.name}</h3>
                </div>
              </div>
              <p className="text-2xl font-bold">
                {currentTeamScore} : {opponentScore}
              </p>
              <p className="text-sm text-muted-foreground sm:text-right">
                {formatted}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
