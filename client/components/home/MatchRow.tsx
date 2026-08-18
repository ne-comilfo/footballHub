import Image from "next/image";
import Link from "next/link";

import {
  type Match,
} from "@football-hub/contracts";
import { formatKickoff } from "@/lib/date";
import PointPulse from "../layout/PointPulse";

export default function MatchRow({ match }: { match: Match }) {
  return (
    <div className="grid grid-cols-3 items-center rounded-xl border p-4 mx-1">
      <div className="flex items-center gap-3">
        <Link
          href={`/teams/${match.home.id}`}
          className="flex justify-center items-center gap-3.5"
        >
          {match.home.logo && (
            <Image
              src={match.home.logo}
              alt={match.home.name}
              width={40}
              height={40}
              className="object-contain"
            />
          )}
          <span className="font-medium">{match.home.name}</span>
        </Link>
      </div>

      <div className="flex flex-col">
        <div className="text-center text-2xl font-bold">
          {match.status === "scheduled"
            ? "VS"
            : `${match.home.score ?? 0} - ${match.away.score ?? 0}`}
        </div>

        <div className="flex justify-center text-lg">
          {match.status === "live" ? (
            <PointPulse />
          ) : (
            formatKickoff(match.kickoff)
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <Link
          href={`/teams/${match.away.id}`}
          className="flex justify-center items-center gap-3.5"
        >
          <span className="font-medium">{match.away.name}</span>
          {match.away.logo && (
            <Image
              src={match.away.logo}
              alt={match.away.name}
              width={50}
              height={50}
              className="object-contain"
            />
          )}
        </Link>
      </div>
    </div>
  );
}
