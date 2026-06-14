import Image from "next/image";
import Link from "next/link";

import { Team } from "@/types/team";

type TeamCardProps = {
  team: Team;
};

export default function TeamCard({ team }: TeamCardProps) {
  return (
    <Link
      href={`/teams/${team.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex h-44 items-center justify-center bg-muted p-8">
        <div className="relative size-28">
          <Image
            src={team.logo}
            alt={team.name}
            fill
            sizes="112px"
            className="object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
        <div>
          <h2 className="text-xl font-bold">{team.name}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{team.country}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg border bg-background p-3">
            <p className="text-xs text-muted-foreground">Стадион</p>
            <p className="mt-1 font-medium">{team.stadium}</p>
          </div>
          <div className="rounded-lg border bg-background p-3">
            <p className="text-xs text-muted-foreground">Основан</p>
            <p className="mt-1 font-medium">{team.founded}</p>
          </div>
        </div>

        <p className="text-sm font-medium">Открыть профиль →</p>
      </div>
    </Link>
  );
}
