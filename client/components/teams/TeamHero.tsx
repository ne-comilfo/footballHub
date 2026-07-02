import Image from "next/image";

import { Team } from "@/types/team";

type TeamHeroProps = {
  team: Team;
};

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-background px-4 py-3">
      <p className="text-xs uppercase text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}

export default function TeamHero({ team }: TeamHeroProps) {
  const teamCur = team.team;

  return (
    <section className="overflow-hidden rounded-xl border bg-card mt-10">
      <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-[220px_1fr] md:items-center">
        <div className="mx-auto flex size-44 items-center justify-center p-8 sm:size-52">
          <div className="relative size-full">
            <Image
              src={teamCur.logo}
              alt={teamCur.name}
              fill
              priority
              sizes="208px"
              className="object-contain"
            />
          </div>
        </div>

        <div className="text-center md:text-left">
          <p className="text-sm font-medium uppercase text-muted-foreground">
            Football Club
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            {teamCur.name}
          </h1>

          <div className="mt-6 grid gap-3 text-sm sm:grid-cols-3">
            <InfoPill label="Страна" value={teamCur.country} />
            <InfoPill label="Стадион" value={team.venue.name} />
            <InfoPill label="Основан" value={teamCur.founded + ""} />
          </div>
        </div>
      </div>
    </section>
  );
}
