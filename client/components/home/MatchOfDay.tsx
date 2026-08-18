"use client";

import Image from "next/image";
import Link from "next/link";

import {
  type Match,
} from "@football-hub/contracts";
import { useMatchOfTheDay } from "@/hooks/useMatches";
import { formatTime, todayInMoscow } from "@/lib/date";
import PointPulse from "../layout/PointPulse";
import QueryBoundary from "../layout/QueryBoundary";

const Title = () => (
  <h2
    id="match-of-the-day"
    className="mb-5 scroll-mt-16 text-center text-3xl font-bold"
  >
    Матч дня
  </h2>
);

function Side({ side }: { side: Match["home"] }) {
  return (
    <div className="flex flex-1 flex-col items-center">
      <Link
        href={`/teams/${side.id}`}
        className="flex flex-col items-center"
      >
        {side.logo && (
          <Image
            src={side.logo}
            alt={side.name}
            width={80}
            height={80}
            className="mb-4 h-20 w-20 object-contain"
          />
        )}

        <h3 className="sm:text-2xl text-xl font-bold text-center">
          {side.name}
        </h3>
      </Link>
    </div>
  );
}

export default function MatchOfTheDay() {
  const query = useMatchOfTheDay(todayInMoscow());

  return (
    <section className="w-full mx-1">
      <QueryBoundary
        query={query}
        title={<Title />}
        errorText="Не удалось загрузить матч дня"
      >
        {(match) => (
          <div className="rounded-2xl border p-8 transition-all hover:shadow-lg">
            <div className="mb-6 text-center text-sm text-muted-foreground">
              {match.league}
            </div>

            <div className="flex items-center justify-between gap-8">
              <Side side={match.home} />

              {match.status !== "scheduled" && (
                <div className="text-4xl font-bold mb-5">
                  {match.home.score ?? 0}
                </div>
              )}

              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold">
                  {match.status !== "scheduled" ? "-" : "VS"}
                </span>

                <span className="mt-2 text-sm text-muted-foreground">
                  {match.status === "scheduled" ? (
                    `Сегодня ${formatTime(match.kickoff)}`
                  ) : match.status === "finished" ? (
                    "Закончен"
                  ) : (
                    <PointPulse />
                  )}
                </span>
              </div>

              {match.status !== "scheduled" && (
                <div className="text-4xl font-bold mb-5">
                  {match.away.score ?? 0}
                </div>
              )}

              <Side side={match.away} />
            </div>
          </div>
        )}
      </QueryBoundary>
    </section>
  );
}
