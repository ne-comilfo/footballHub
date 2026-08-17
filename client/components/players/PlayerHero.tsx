import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import type { Player } from "@/contracts/player";

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-background px-4 py-3">
      <p className="text-xs uppercase text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}

export default function PlayerHero({ player }: { player: Player }) {
  const season = player.seasons[0]?.season;

  return (
    <section className="overflow-hidden rounded-xl border bg-card mt-1">
      <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-[240px_1fr] md:items-center">
        <div className="mx-auto flex h-72 w-full max-w-60 items-end justify-center rounded-xl px-6 pt-6">
          <div className="relative h-64 w-full">
            <Image
              src={player.photo}
              alt={player.name}
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
            <Badge>{player.position}</Badge>
          </div>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            {player.name}
          </h1>

          <p className="mt-3 text-muted-foreground flex gap-1">
            {player.club.id ? (
              <Link href={`/teams/${player.club.id}`}>{player.club.name}</Link>
            ) : (
              <span>{player.club.name}</span>
            )}
            · {player.country}
          </p>

          <div className="mt-6 grid gap-3 text-sm sm:grid-cols-4">
            <InfoPill
              label="Возраст"
              value={player.age ? String(player.age) : "—"}
            />
            <InfoPill
              label="Рост"
              value={player.heightCm ? `${player.heightCm} см` : "—"}
            />
            <InfoPill
              label="Вес"
              value={player.weightKg ? `${player.weightKg} кг` : "—"}
            />
            <InfoPill label="Сезон" value={season ? String(season) : "—"} />
          </div>
        </div>
      </div>
    </section>
  );
}
