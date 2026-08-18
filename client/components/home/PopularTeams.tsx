"use client";

import Image from "next/image";
import Link from "next/link";

import {
  type TeamCard as TeamCardType,
} from "@football-hub/contracts";
import { usePopularTeams } from "@/hooks/useTeams";
import QueryBoundary from "../layout/QueryBoundary";

function TeamCard({ team }: { team: TeamCardType }) {
  return (
    <Link
      href={`/teams/${team.id}`}
      className="group block rounded-xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex h-28 sm:h-36 items-center justify-center">
        <div className="relative size-21 sm:size-24">
          <Image
            src={team.logo}
            alt={team.name}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-xl font-semibold">{team.name}</h3>

        <p className="mt-2 text-sm text-muted-foreground">{team.country}</p>
      </div>
    </Link>
  );
}

const Title = () => (
  <h2
    id="popular-teams"
    className="font-bold scroll-mt-16 text-3xl text-center items-center mb-5"
  >
    Популярные команды
  </h2>
);

export default function PopularTeams() {
  const query = usePopularTeams();

  return (
    <div className="items-center flex flex-col mx-1">
      <QueryBoundary
        query={query}
        title={<Title />}
        errorText="Не удалось загрузить команды"
        isEmpty={(teams) => teams.length === 0}
      >
        {(teams) => (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
            {teams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}

            <Link
              href="/teams"
              className="col-span-2 sm:col-span-3 rounded-xl border p-4 text-center font-medium"
            >
              Все команды →
            </Link>
          </div>
        )}
      </QueryBoundary>
    </div>
  );
}
