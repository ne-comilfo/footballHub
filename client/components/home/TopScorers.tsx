"use client";

import Image from "next/image";
import Link from "next/link";

import { useTopScorers } from "@/hooks/usePlayers";
import QueryBoundary from "../layout/QueryBoundary";

const Title = () => (
  <h2
    id="top-scorers"
    className="mb-5 scroll-mt-16 text-center text-3xl font-bold"
  >
    Топ бомбардиров
  </h2>
);

export default function TopScorers() {
  const query = useTopScorers();

  return (
    <div className="mx-1 flex flex-col items-center">
      <QueryBoundary
        query={query}
        title={<Title />}
        errorText="Не удалось загрузить бомбардиров"
        emptyText="Статистика ещё не загружена"
        isEmpty={(scorers) => scorers.length === 0}
      >
        {(scorers) => (
          <div className="w-full rounded-xl border">
            {scorers.map((player, index) => (
              <Link
                href={`/players/${player.id}`}
                key={player.id}
                className="flex items-center justify-between border-b p-4 transition-colors last:border-b-0 hover:bg-muted/50"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <span className="w-6 text-lg font-bold text-muted-foreground">
                    {index + 1}
                  </span>

                  <Image
                    src={player.photo}
                    alt={player.name}
                    width={40}
                    height={40}
                    className="size-10 shrink-0 rounded-full object-cover"
                  />

                  <div className="min-w-0">
                    <p className="truncate font-medium">{player.name}</p>
                    <p className="truncate text-sm text-muted-foreground">
                      {player.club.name}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-4 text-sm">
                  <span className="hidden text-muted-foreground sm:inline">
                    {player.appearances} матчей
                  </span>
                  <span className="text-base font-bold">⚽ {player.goals}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </QueryBoundary>
    </div>
  );
}
