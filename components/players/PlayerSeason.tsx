import SectionTitle from "@/components/teams/SectionTitle";
import { PlayerSeason as PlayerSeasonType } from "@/types/player";

type PlayerSeasonProps = {
  seasons: PlayerSeasonType[];
};

export default function PlayerSeason({ seasons }: PlayerSeasonProps) {
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
        {seasons.map((season) => {
          const games = season.games.appearences ?? 0;
          const goals = season.goals.total ?? 0;
          const assists = season.goals.assists ?? 0;
          return (
            <div
              key={season.league.name}
              className="grid grid-cols-[1.5fr_repeat(3,0.7fr)] border-t px-4 py-3 text-sm"
            >
              <span className="font-medium">
                {(season.league.country ?? "") + " " + season.league.name}
              </span>
              <span className={games === 0 ? "text-red-500" : ""}>{games}</span>
              <span className={goals === 0 ? "text-red-500" : ""}>{goals}</span>
              <span className={assists === 0 ? "text-red-500" : ""}>
                {assists}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
