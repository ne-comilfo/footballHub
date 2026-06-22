"use client";

import Image from "next/image";
import Link from "next/link";

import { Team } from "@/types/main-page";
import usePopularTeams from "@/hooks/useTeams";

function TeamCard({ country, logo, name, id }: Team) {
  return (
    <Link
      href={`/teams/${id}`}
      className="group block rounded-xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex h-28 sm:h-36 items-center justify-center">
        <div className="relative size-21 sm:size-24">
          <Image
            src={logo}
            alt={name}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-xl font-semibold">{name}</h3>

        <p className="mt-2 text-sm text-muted-foreground">{country}</p>
      </div>
    </Link>
  );
}

const Title = () => (
  <h2 id="popular-teams" className="font-bold scroll-mt-16 text-3xl text-center items-center mb-5">
    Популярные команды
  </h2>
);

export default function PopularTeams() {
  const { data, isLoading, error } = usePopularTeams();

  if (isLoading)
    return (
      <>
        <Title />
        <div className="text-xl flex justify-center">Загрузка...</div>
      </>
    );
  if (error)
    return (
      <>
        <Title />
        <div className="text-xl flex justify-center">
          Не удалось загрузить команды
        </div>
      </>
    );

  if (!data)
    return (
      <>
        <Title />
        <div className="text-xl flex justify-center">
          Нет данных
        </div>
      </>
    );
  return (
    <div className="items-center flex flex-col mx-1">
      <Title />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
        {data.map((item) => (
          <TeamCard
            key={item.idTeam}
            id={item.idTeam}
            country={item.strCountry}
            name={item.strTeam}
            logo={item.strBadge}
          />
        ))}
        <Link
          href="/teams"
          className="col-span-2 sm:col-span-3 rounded-xl border p-4 text-center font-medium"
        >
          Все команды →
        </Link>
      </div>
    </div>
  );
}
