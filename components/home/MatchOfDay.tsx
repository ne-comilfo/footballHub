"use client";

import Image from "next/image";
import Link from "next/link";
import { useMatch } from "@/hooks/useMatch";

const Title = () => (
  <h2 className="mb-5 text-center text-3xl font-bold">Матч дня</h2>
);

const PointPulse = () => (
  <div className="flex items-center gap-2">
    <span className="relative flex h-3 w-3">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
      <span className="relative inline-flex h-3 w-3 rounded-full bg-red-600" />
    </span>

    <span className="font-medium">Идет</span>
  </div>
);

function TeamMatch({ name }: { name: string }) {
  return <h3 className="sm:text-2xl text-xl font-bold text-center">{name}</h3>;
}

type MatchStatus = "finish" | "live" | "wait";

export default function MatchOfTheDay() {
  const today = new Date().toLocaleDateString("en-En");
  const temp = today.split("/");
  const validToday = temp[2] + "-" + temp[0].padStart(2, "0") + "-" + temp[1];
  const { data, isLoading, error } = useMatch(validToday);

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
          Не удалось загрузить матч дня
        </div>
      </>
    );

  if (!data)
    return (
      <>
        <Title />
        <div className="text-xl flex justify-center">Нет данных</div>
      </>
    );

  const time = new Date(data.strTimestamp + "Z").toLocaleTimeString("ru-Ru", {
    hour: "numeric",
    minute: "2-digit",
  });

  const matchHour = new Date(data.strTimestamp + "Z").getHours();
  const currentHour = new Date().getHours();

  const status: MatchStatus =
    currentHour >= matchHour + 2
      ? "finish"
      : currentHour < matchHour
        ? "wait"
        : "live";

  return (
    <section className="w-full mx-1">
      <Title />

      <div className="rounded-2xl border p-8 transition-all hover:shadow-lg">
        <div className="mb-6 text-center text-sm text-muted-foreground">
          {data.strLeague}
        </div>

        <div className="flex items-center justify-between gap-8">
          <div className="flex flex-1 flex-col items-center">
            <Link
              href={`/teams/${data.idHomeTeam}`}
              className="flex flex-col items-center"
            >
              <Image
                src={data.strHomeTeamBadge}
                alt={data.strHomeTeam}
                width={80}
                height={80}
                className="mb-4 h-20 w-20 object-contain"
              />

              <TeamMatch name={data.strHomeTeam} />
            </Link>
          </div>

          {status === "finish" && (
            <div className="text-4xl font-bold mb-5">{data.intHomeScore}</div>
          )}

          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold">
              {status !== "wait" ? "-" : "VS"}
            </span>

            <span className="mt-2 text-sm text-muted-foreground">
              {status === "wait" ? (
                `Сегодня ${time}`
              ) : status === "finish" ? (
                "Закончен"
              ) : (
                <PointPulse />
              )}
            </span>
          </div>
          {status === "finish" && (
            <div className="text-4xl font-bold mb-5">{data.intAwayScore}</div>
          )}

          <div className="flex flex-1 flex-col items-center">
            <Link
              href={`/teams/${data.idAwayTeam}`}
              className="flex flex-col items-center"
            >
              <Image
                src={data.strAwayTeamBadge}
                alt={data.strAwayTeam}
                width={80}
                height={80}
                className="mb-4 h-20 w-20 object-contain"
              />

              <TeamMatch name={data.strAwayTeam} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
