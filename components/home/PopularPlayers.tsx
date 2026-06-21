import { Player } from "@/types/main-page";

import Link from "next/link";
import Image from "next/image";

import { popularPlayers } from "@/data/players";

function PlayerCard({ id, name, img, country }: Player) {
  return (
    <Link
      href={`/players/${id}`}
      className="group block rounded-xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex h-28 sm:h-36 items-center justify-center">
        <div className="relative size-21 sm:size-24">
          <Image
            src={img}
            alt={name}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-xl font-semibold">{name}</h3>

        <p className="mt-2 text-sm text-muted-foreground">{country}</p>
      </div>
    </Link>
  );
}

export default function PopularPlayers() {
  return (
    <div className="items-center flex flex-col">
      <h2 className="font-bold text-3xl text-center items-center mb-5">
        Популярные игроки
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
        {popularPlayers.map((item) => (
          <PlayerCard key={item.id} {...item} />
        ))}
        <Link
          href="/players"
          className="col-span-2 sm:col-span-3 rounded-xl border p-4 text-center font-medium"
        >
          Все игроки →
        </Link>
      </div>
    </div>
  );
}
