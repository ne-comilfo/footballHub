import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { PlayerDetails } from "@/types/player";

type PlayerHeroProps = {
  player: PlayerDetails;
};

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-background px-4 py-3">
      <p className="text-xs uppercase text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}

export default function PlayerHero({ player }: PlayerHeroProps) {
  return (
    <section className="overflow-hidden rounded-xl border bg-card">
      <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-[240px_1fr] md:items-center">
        <div className="mx-auto flex h-72 w-full max-w-60 items-end justify-center rounded-xl bg-muted px-6 pt-6">
          <div className="relative h-64 w-full">
            <Image
              src={player.image}
              alt={player.name}
              fill
              priority
              sizes="240px"
              className="object-contain object-bottom"
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
          <p className="mt-3 text-muted-foreground">
            {player.club} · {player.country}
          </p>

          <div className="mt-6 grid gap-3 text-sm sm:grid-cols-4">
            <InfoPill label="Номер" value={`#${player.number}`} />
            <InfoPill label="Возраст" value={player.age} />
            <InfoPill label="Нога" value={player.foot} />
            <InfoPill label="Клуб" value={player.club} />
          </div>
        </div>
      </div>
    </section>
  );
}
