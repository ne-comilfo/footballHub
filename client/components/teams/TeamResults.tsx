import Image from "next/image";

import { TeamResult } from "@/types/team";

import SectionTitle from "./SectionTitle";

type TeamResultsProps = {
  results: TeamResult[];
};

export default function TeamResults({ results }: TeamResultsProps) {
  return (
    <section className="space-y-4">
      <SectionTitle>Последние результаты</SectionTitle>
      <div className="grid gap-3">
        {results.map((match) => (
          <div
            key={`${match.opponent}-${match.date}`}
            className="grid gap-4 rounded-xl border bg-card p-4 sm:grid-cols-[1fr_auto_auto] sm:items-center"
          >
            <div className="flex items-center gap-3">
              <Image
                src={match.logo}
                alt={match.opponent}
                width={44}
                height={44}
                className="object-contain"
              />
              <div>
                <p className="text-sm text-muted-foreground">Соперник</p>
                <h3 className="font-semibold">{match.opponent}</h3>
              </div>
            </div>
            <p className="text-2xl font-bold">{match.score}</p>
            <p className="text-sm text-muted-foreground sm:text-right">
              {match.date}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
