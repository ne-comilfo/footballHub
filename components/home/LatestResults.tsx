"use client";

import Image from "next/image";
import Link from "next/link";

import { Result } from "@/types/main-page";

import useLastResults from "@/hooks/useLastResults";

function ResultCard({
  homeTeam,
  awayTeam,
  homeLogo,
  awayLogo,
  homeScore,
  awayScore,
  idHomeTeam,
  idAwayTeam,
  strTimestamp,
}: Result) {
  const date = new Date(strTimestamp + "Z");
  const formattedDate = date.toLocaleString("ru-RU", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="grid grid-cols-3 items-center rounded-xl border p-4 mx-1">
      <div className="flex items-center gap-3">
        <Link
          href={`/teams/${idHomeTeam}`}
          className="flex justify-center items-center gap-3.5"
        >
          <Image
            src={homeLogo}
            alt={homeTeam}
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="font-medium">{homeTeam}</span>
        </Link>
      </div>

      <div className="flex flex-col">
        <div className="text-center text-2xl font-bol ">
          {homeScore}:{awayScore}
        </div>
        <div className="text-center text-lg">{formattedDate}</div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <Link
          href={`/teams/${idAwayTeam}`}
          className="flex justify-center items-center gap-3.5"
        >
          <span className="font-medium">{awayTeam}</span>
          <Image
            src={awayLogo}
            alt={awayTeam}
            width={50}
            height={50}
            className="object-contain"
          />
        </Link>
      </div>
    </div>
  );
}

const Title = () => (
  <h2 id="latest-results" className="mb-5 scroll-mt-16 text-center text-3xl font-bold">Последние результаты</h2>
);

export default function LatestResults() {
  const { data, error, isLoading } = useLastResults();

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
        <div className="text-xl flex justify-center">Ошибка загрузки матчей</div>
      </>
    );

    if (!data)
    return (
      <>
        <Title />
        <div className="text-xl flex justify-center">Нет данных</div>
      </>
    );

  return (
    <div className="flex flex-col items-center">
      <Title />
      <div className="w-full space-y-3">
        {data.map((match) => (
          <ResultCard
            key={match.idEvent}
            homeTeam={match.strHomeTeam}
            awayTeam={match.strAwayTeam}
            homeLogo={match.strHomeTeamBadge}
            awayLogo={match.strAwayTeamBadge}
            homeScore={match.intHomeScore}
            awayScore={match.intAwayScore}
            {...match}
          />
        ))}
      </div>
    </div>
  );
}
