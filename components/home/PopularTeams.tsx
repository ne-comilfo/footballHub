import Image from "next/image";
import Link from "next/link";

import { Team } from "@/types/main-page";
import { popularTeams } from "@/data/teams";

function TeamCard({ country, logo, name, id }: Team) {
  return (
    <Link
      href={`/teams/${id}`}
      className="group block rounded-xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex h-36 items-center justify-center">
        <div className="relative h-24 w-24">
          <Image
            src={logo}
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

export default function PopularTeams() {
  return (
    <div className="items-center flex flex-col">
      <h2 className="font-bold text-3xl text-center items-center mb-5">
        Популярные команды
      </h2>
      <div className="grid grid-cols-3 gap-4 w-full">
        {popularTeams.map((item) => (
          <TeamCard key={item.id} {...item} />
        ))}
        <Link
          href="/teams"
          className="col-span-3 rounded-xl border p-4 text-center font-medium"
        >
          Все команды →
        </Link>
      </div>
    </div>
  );
}
