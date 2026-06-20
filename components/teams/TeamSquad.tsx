import Image from "next/image";

import { SquadPlayer } from "@/types/team";

import SectionTitle from "./SectionTitle";

type TeamSquadProps = {
  squad: SquadPlayer[];
};

export default function TeamSquad({ squad }: TeamSquadProps) {
  return (
    <section className="space-y-4">
      <SectionTitle>Состав команды</SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {squad.map((player) => (
          <div
            key={player.name}
            className="overflow-hidden rounded-xl border bg-card"
          >
            <div className="relative h-46 bg-muted">
              <Image
                src={player.image}
                alt={player.name}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-contain object-bottom p-4"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{player.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {player.position}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
