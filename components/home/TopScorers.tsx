import Link from "next/link";

import { topScorers } from "@/data/scorers";

export default function TopScorers() {
  return (
    <div className="flex flex-col items-center mx-1">
      <h2 id="top-scorers" className="mb-5 scroll-mt-16 text-center text-3xl font-bold">Топ бомбардиров</h2>

      {true ? (
        <h3 className="text-center text-2xl font-bold">В доработке</h3>
      ) : (
        <div className="w-full rounded-xl border">
          {topScorers.map((player, index) => (
            <Link
              href={`/players/${player.id}`}
              key={player.id}
              className="flex items-center justify-between border-b p-4 last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <span className="text-lg font-bold text-muted-foreground">
                  #{index + 1}
                </span>

                <span className="font-medium">{player.name}</span>
              </div>

              <span className="font-bold">⚽ {player.goals}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
