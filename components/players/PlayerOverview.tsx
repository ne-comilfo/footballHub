import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PlayerDetails } from "@/types/player";

type PlayerOverviewProps = {
  player: PlayerDetails;
};

export default function PlayerOverview({ player }: PlayerOverviewProps) {
  return (
    <section className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
      <div className="rounded-xl border bg-card p-5 sm:p-6">
        <h2 className="text-2xl font-bold tracking-tight">Сильные стороны</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {player.strengths.map((strength) => (
            <Badge key={strength} variant="secondary">
              {strength}
            </Badge>
          ))}
        </div>
        <Separator className="my-5" />
        <p className="text-sm leading-6 text-muted-foreground">
          Моковый профиль для витрины Football Hub: быстрый обзор формы,
          позиции, клуба и игровых акцентов без привязки к реальному API.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-5 sm:p-6">
        <h2 className="text-2xl font-bold tracking-tight">Новости игрока</h2>
        <div className="mt-5 grid gap-3">
          {player.news.map((item) => (
            <article key={item.title} className="rounded-xl border bg-background p-4">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
