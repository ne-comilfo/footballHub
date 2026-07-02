"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { SquadPlayer } from "@/types/team";

import { usePlayersOfTeam } from "@/hooks/useTeams";
import { useState, useEffect } from "react";

import SectionTitle from "./SectionTitle";
import QueryBoundary from "../layout/QueryBoundary";

const PlayerCard = ({ player }: { player: SquadPlayer }) => {
  
  return (
    <Link href={`/players/${player.id}`}>
      <div
        key={player.name}
        className="overflow-hidden rounded-xl border bg-card"
      >
        <div className="relative h-46 bg-muted">
          <Image
            src={player.photo}
            alt={player.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain object-bottom"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold truncate">{player.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {player.position}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default function TeamSquad({
  teamId,
  setCountPlayers,
}: {
  teamId: string;
  setCountPlayers: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const { data, isLoading, error } = usePlayersOfTeam(teamId);

  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
    if (!data) return;
    setCountPlayers(data.length);
  }, [data, setCountPlayers]);

  if (!data || isLoading || error) {
    return (
      <QueryBoundary
        isLoading={isLoading}
        error={error}
        data={data}
        emptyText="Нет данных"
        loadingText="Загрузка..."
        errorText="Не удалось загрузить последние матчи команды"
      />
    );
  }

  const squad: SquadPlayer[] = data;
  const visiblePlayers = isExpanded ? squad : squad.slice(0, 10);
  
  return (
    <section className="space-y-4 flex flex-col">
      <SectionTitle>Состав команды</SectionTitle>
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {visiblePlayers.map((player) => (
          <PlayerCard key={player.name} player={player} />
        ))}
      </div>
      {squad.length > 10 && (
        <Button
          variant="outline"
          className="self-center"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? "Скрыть" : "Показать ещё"}
        </Button>
      )}
    </section>
  );
}
