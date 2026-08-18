"use client";

import Image from "next/image";
import Link from "next/link";

import {
  type PlayerCard as PlayerCardType,
} from "@football-hub/contracts";
import { usePopularPlayers } from "@/hooks/usePlayers";
import QueryBoundary from "../layout/QueryBoundary";

function PlayerCard({ player }: { player: PlayerCardType }) {
  return (
    <Link
      href={`/players/${player.id}`}
      className="group block rounded-xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex h-28 sm:h-36 items-center justify-center">
        <div className="relative size-21 sm:size-24">
          <Image
            src={player.photo}
            alt={player.name}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-xl font-semibold">{player.name}</h3>

        <p className="mt-2 text-sm text-muted-foreground">{player.country}</p>
      </div>
    </Link>
  );
}

const Title = () => (
  <h2
    id="popular-players"
    className="font-bold scroll-mt-16 text-3xl text-center items-center mb-5"
  >
    Популярные игроки
  </h2>
);

export default function PopularPlayers() {
  const query = usePopularPlayers();

  return (
    <div className="items-center flex flex-col mx-1">
      <QueryBoundary
        query={query}
        title={<Title />}
        errorText="Не удалось загрузить игроков"
        isEmpty={(players) => players.length === 0}
      >
        {(players) => (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
            {players.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}

            <Link
              href="/players"
              className="col-span-2 sm:col-span-3 rounded-xl border p-4 text-center font-medium"
            >
              Все игроки →
            </Link>
          </div>
        )}
      </QueryBoundary>
    </div>
  );
}
