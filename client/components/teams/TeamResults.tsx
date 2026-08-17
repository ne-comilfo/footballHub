"use client";

import Image from "next/image";

import { useTeamFixtures } from "@/hooks/useTeams";
import { formatDateTime } from "@/lib/date";
import QueryBoundary from "../layout/QueryBoundary";
import SectionTitle from "./SectionTitle";

export default function TeamResults({ teamId }: { teamId: string }) {
  const query = useTeamFixtures(teamId);

  return (
    <section className="space-y-4">
      <QueryBoundary
        query={query}
        title={<SectionTitle>Последние результаты</SectionTitle>}
        errorText="Не удалось загрузить матчи команды"
        isEmpty={(fixtures) => fixtures.length === 0}
      >
        {(fixtures) => (
          <div className="grid gap-3">
            {fixtures.map((fixture) => (
              <div
                key={fixture.id}
                className="grid gap-4 rounded-xl border bg-card p-4 sm:grid-cols-[1fr_auto_auto] sm:items-center"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={fixture.opponent.logo}
                    alt={fixture.opponent.name}
                    width={44}
                    height={44}
                    className="object-contain"
                  />
                  <div>
                    <p className="text-sm text-muted-foreground">Соперник</p>
                    <h3 className="font-semibold">{fixture.opponent.name}</h3>
                  </div>
                </div>

                <p className="text-2xl font-bold">
                  {fixture.goalsFor ?? 0} : {fixture.goalsAgainst ?? 0}
                </p>

                <p className="text-sm text-muted-foreground sm:text-right">
                  {formatDateTime(fixture.date)}
                </p>
              </div>
            ))}
          </div>
        )}
      </QueryBoundary>
    </section>
  );
}
