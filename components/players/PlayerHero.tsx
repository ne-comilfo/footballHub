import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { PlayerHeroProps } from "@/types/player";

function getAge(dateBorn: string) {
  const birthDate = new Date(dateBorn);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age + "";
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-background px-4 py-3">
      <p className="text-xs uppercase text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}

export default function PlayerHero({ player, photo }: PlayerHeroProps) {
  const stats =
    player.statistics.find((s) => s.games.appearences > 0) ??
    player.statistics[0];
  const playerInfo = player.player;
  return (
    <section className="overflow-hidden rounded-xl border bg-card mt-1">
      <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-[240px_1fr] md:items-center">
        <div className="mx-auto flex h-72 w-full max-w-60 items-end justify-center rounded-xl px-6 pt-6">
          <div className="relative h-64 w-full">
            <Image
              src={photo}
              alt={playerInfo.name}
              fill
              priority
              sizes="240px"
              className="object-contain object-center"
            />
          </div>
        </div>

        <div className="text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
            <Badge variant="outline">Player Profile</Badge>
            <Badge>{stats.games.position}</Badge>
          </div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            {playerInfo.name}
          </h1>
          <p className="mt-3 text-muted-foreground flex gap-1">
            <Link href={`/teams/${stats.team.id}`}> {stats.team.name} </Link> · {playerInfo.nationality}
          </p>

          <div className="mt-6 grid gap-3 text-sm sm:grid-cols-4">
            <InfoPill label="Возраст" value={getAge(playerInfo.birth.date)} />

            <InfoPill
              label="Рост"
              value={`${parseInt(playerInfo.height)} см`}
            />

            <InfoPill label="Вес" value={`${parseInt(playerInfo.weight)} кг`} />

            <InfoPill label="Сезон" value={stats.league.season + ""} />
          </div>
        </div>
      </div>
    </section>
  );
}
