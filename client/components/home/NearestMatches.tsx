"use client";

import { useMatchesBoard } from "@/hooks/useMatches";
import QueryBoundary from "../layout/QueryBoundary";
import MatchRow from "./MatchRow";

const Title = () => (
  <h2
    id="nearest-matches"
    className="mb-5 scroll-mt-16 text-center text-3xl font-bold"
  >
    Ближайшие матчи
  </h2>
);

export default function NearestMatches() {
  const query = useMatchesBoard();

  return (
    <div className="flex flex-col items-center">
      <QueryBoundary
        query={query}
        title={<Title />}
        errorText="Ошибка загрузки матчей"
        isEmpty={(board) => board.nearest.length === 0}
      >
        {(board) => (
          <div className="w-full space-y-3">
            {board.nearest.map((match) => (
              <MatchRow key={match.id} match={match} />
            ))}
          </div>
        )}
      </QueryBoundary>
    </div>
  );
}
