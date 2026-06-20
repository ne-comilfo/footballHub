import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { PlayerDetails } from "@/types/player";

type PlayerCardProps = {
  player: PlayerDetails;
};

export default function PlayerCard({ player }: PlayerCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/players/${player.id}`} className="flex h-56 items-end justify-center bg-muted px-6 pt-6">
        <div className="relative h-52 w-full max-w-44">
          <Image
            src={player.image}
            alt={player.name}
            fill
            sizes="176px"
            className="object-contain object-bottom transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col justify-between gap-4 p-5">
        <div>
          <div className="flex items-center justify-between gap-3">
            <Badge variant="outline">{player.position}</Badge>
            <span className="text-sm font-semibold">#{player.number}</span>
          </div>
          <h2 className="mt-3 text-xl font-bold">{player.name}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {player.club} · {player.country}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 text-sm">
          {player.stats.slice(0, 3).map((stat) => (
            <div key={stat.label} className="rounded-lg border bg-background p-3">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="mt-1 font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>

        <Link
          href={`/players/${player.id}`}
          className={buttonVariants({ variant: "outline", size: "lg", className: "w-full rounded-xl" })}
        >
          Открыть профиль
        </Link>
      </div>
    </article>
  );
}
