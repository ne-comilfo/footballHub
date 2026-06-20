import SectionTitle from "@/components/teams/SectionTitle";
import { PlayerSeason as PlayerSeasonType } from "@/types/player";

type PlayerSeasonProps = {
  seasons: PlayerSeasonType[];
};

export default function PlayerSeason({ seasons }: PlayerSeasonProps) {
  return (
    <section className="rounded-xl border bg-card p-5 sm:p-6">
      <SectionTitle>Сезон</SectionTitle>
      <div className="mt-5 overflow-hidden rounded-xl border">
        <div className="grid grid-cols-[1.5fr_repeat(3,0.7fr)] bg-muted px-4 py-3 text-sm font-medium text-muted-foreground">
          <span>Турнир</span>
          <span>Матчи</span>
          <span>Голы</span>
          <span>Ассисты</span>
        </div>
        {seasons.map((season) => (
          <div
            key={season.tournament}
            className="grid grid-cols-[1.5fr_repeat(3,0.7fr)] border-t px-4 py-3 text-sm"
          >
            <span className="font-medium">{season.tournament}</span>
            <span>{season.matches}</span>
            <span>{season.goals}</span>
            <span>{season.assists}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
