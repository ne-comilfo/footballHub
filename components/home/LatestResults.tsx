import Image from "next/image";

import { Result } from "@/types/main-page";
import { latestResults } from "@/data/results";

function ResultCard({
  homeTeam,
  awayTeam,
  homeLogo,
  awayLogo,
  homeScore,
  awayScore,
}: Result) {
  return (
    <div className="grid grid-cols-3 items-center rounded-xl border p-4">
      <div className="flex items-center gap-3">
        <Image
          src={homeLogo}
          alt={homeTeam}
          width={40}
          height={40}
          className="object-contain"
        />
        <span className="font-medium">{homeTeam}</span>
      </div>

      <div className="text-center text-2xl font-bold">
        {homeScore}:{awayScore}
      </div>

      <div className="flex items-center justify-end gap-3">
        <span className="font-medium">{awayTeam}</span>
        <Image
          src={awayLogo}
          alt={awayTeam}
          width={50}
          height={50}
          className="object-contain"
        />
      </div>
    </div>
  );
}

export default function LatestResults() {
  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-5 text-center text-3xl font-bold">
        Последние результаты
      </h2>

      <div className="w-full space-y-3">
        {latestResults.map((match) => (
          <ResultCard key={match.id} {...match} />
        ))}
      </div>
    </div>
  );
}
