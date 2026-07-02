"use client";

import PlayerHero from "@/components/players/PlayerHero";
import PlayerNavigation from "@/components/players/PlayerNavigation";
import PlayerOverview from "@/components/players/PlayerOverview";
import PlayerSeason from "@/components/players/PlayerSeason";
import PlayerStats from "@/components/players/PlayerStats";

import { playerDetails } from "@/data/player-details";

import { useParams } from "next/navigation";
import { usePlayerApiFootball } from "@/hooks/usePlayers";
import QueryBoundary from "@/components/layout/QueryBoundary";

export default function PlayerPage() {
  const params = useParams();
  const id = params.id as string;
  const { data, error, isLoading } = usePlayerApiFootball(id ?? "");

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

  const goals = data.statistics.reduce(
      (acc: any, curVal: any) => acc + (curVal.goals.total ?? 0),
      0,
    ),
    assists = data.statistics.reduce(
      (acc: any, curVal: any) => acc + (curVal.goals.assists ?? 0),
      0,
    ),
    matches = data.statistics.reduce(
      (acc: any, curVal: any) => acc + (curVal.games.appearences ?? 0),
      0,
    ),
    ratings = data.statistics
      .map((stat: any) => stat.games.rating)
      .filter((rating: any): rating is string => rating !== null);

  const averageRating = ratings.length > 0 ? (
    ratings.reduce((acc: any, rating: any) => acc + Number(rating), 0) /
    ratings.length
  ).toFixed(2) : "N/A";

  const stats = [
    { value: goals, label: "Голы" },
    { value: assists, label: "Ассисты" },
    { value: matches, label: "Матчи" },
    { value: averageRating ?? "-", label: "Рейтинг" },
  ];

  return (
    <div className="mx-auto mb-8 flex w-full max-w-5xl flex-col gap-8 px-4 sm:px-6">
      <PlayerHero player={data}/>
      <PlayerStats stats={stats} />
      <PlayerSeason seasons={data.statistics}/>
      <PlayerOverview player={playerDetails[0]} />
      <PlayerNavigation />
    </div>
  );
}
