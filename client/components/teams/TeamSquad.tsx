"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import type { SquadPlayer } from "@/contracts/team";
import { useTeamSquad } from "@/hooks/useTeams";
import QueryBoundary from "../layout/QueryBoundary";
import SectionTitle from "./SectionTitle";

const VISIBLE_LIMIT = 10;

function PlayerCard({ player }: { player: SquadPlayer }) {
  return (
    <Link href={`/players/${player.id}`}>
      <div className="overflow-hidden rounded-xl border bg-card">
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
            {player.position ?? "—"}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function TeamSquad({ teamId }: { teamId: string }) {
  const query = useTeamSquad(teamId);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="space-y-4 flex flex-col">
      <QueryBoundary
        query={query}
        title={<SectionTitle>Состав команды</SectionTitle>}
        errorText="Не удалось загрузить состав команды"
        isEmpty={(squad) => squad.length === 0}
      >
        {(squad) => (
          <>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {(isExpanded ? squad : squad.slice(0, VISIBLE_LIMIT)).map(
                (player) => (
                  <PlayerCard key={player.id} player={player} />
                ),
              )}
            </div>

            {squad.length > VISIBLE_LIMIT && (
              <Button
                variant="outline"
                className="self-center"
                onClick={() => setIsExpanded((prev) => !prev)}
              >
                {isExpanded ? "Скрыть" : "Показать ещё"}
              </Button>
            )}
          </>
        )}
      </QueryBoundary>
    </section>
  );
}
