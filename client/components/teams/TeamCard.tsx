import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { TeamCardProps } from "@/types/team";

export default function TeamCard({ team }: { team: TeamCardProps }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={`/teams/${team.idAPIfootball}`}
        className="flex h-56 items-center justify-center bg-muted p-8"
      >
        <div className="relative size-32">
          <Image
            src={team.strBadge}
            alt={team.strTeam}
            fill
            sizes="128px"
            className="object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col justify-between gap-4 p-5">
        <div>
          <div className="flex items-center justify-between gap-3">
            <Badge variant="outline">Football Club</Badge>
            <span className="text-sm font-medium text-muted-foreground truncate">
              {team.strCountry}
            </span>
          </div>
          <h2 className="mt-3 text-xl font-bold">{team.strTeam}</h2>
          <p className="mt-1 text-sm text-muted-foreground">Профиль команды</p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg border bg-background p-3">
            <p className="text-xs text-muted-foreground">Стадион</p>
            <p className="mt-1 font-medium">{team.strStadium}</p>
          </div>
          <div className="rounded-lg border bg-background p-3">
            <p className="text-xs text-muted-foreground">Основан</p>
            <p className="mt-1 font-medium">{team.intFormedYear}</p>
          </div>
        </div>

        <Link
          href={`/teams/${team.idAPIfootball}`}
          className={buttonVariants({
            variant: "outline",
            size: "lg",
            className: "w-full rounded-xl",
          })}
        >
          Открыть профиль
        </Link>
      </div>
    </article>
  );
}
