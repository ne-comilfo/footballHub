import SectionTitle from "@/components/teams/SectionTitle";
import type { PlayerSeason as PlayerSeasonType } from "@/contracts/player";

export default function PlayerSeason({
  seasons,
}: {
  seasons: PlayerSeasonType[];
}) {
  return (
    <section className="rounded-xl border bg-card p-5 sm:p-6">
      <SectionTitle>Сезон</SectionTitle>

      <div className="mt-5 overflow-hidden max-h-[290px] overflow-y-auto rounded-xl border">
        <div className="sticky top-0 grid grid-cols-[1.5fr_repeat(3,0.7fr)] bg-muted px-4 py-3 text-sm font-medium text-muted-foreground">
          <span>Турнир</span>
          <span>Матчи</span>
          <span>Голы</span>
          <span>Ассисты</span>
        </div>

        {seasons.map((season, index) => (
          <div
            key={`${season.leagueName}-${index}`}
            className="grid grid-cols-[1.5fr_repeat(3,0.7fr)] border-t px-4 py-3 text-sm"
          >
            <span className="font-medium">
              {[season.leagueCountry, season.leagueName]
                .filter(Boolean)
                .join(" ")}
            </span>
            <span className={season.appearances === 0 ? "text-red-500" : ""}>
              {season.appearances}
            </span>
            <span className={season.goals === 0 ? "text-red-500" : ""}>
              {season.goals}
            </span>
            <span className={season.assists === 0 ? "text-red-500" : ""}>
              {season.assists}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
