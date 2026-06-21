interface ProfileStatsProps {
  favoritesCount: number;
  newsCount: number;
}

export default function ProfileStats({
  favoritesCount,
  newsCount,
}: ProfileStatsProps) {
  return (
    <section className="grid gap-3 sm:grid-cols-3">
      <div className="rounded-xl border bg-card p-5">
        <p className="text-sm text-muted-foreground">В избранном</p>
        <p className="mt-2 text-3xl font-bold">{favoritesCount}</p>
      </div>

      <div className="rounded-xl border bg-card p-5">
        <p className="text-sm text-muted-foreground">Сохранено новостей</p>
        <p className="mt-2 text-3xl font-bold">{newsCount}</p>
      </div>

      <div className="rounded-xl border bg-card p-5">
        <p className="text-sm text-muted-foreground">Профиль создан</p>
        <p className="mt-2 text-lg font-bold">Июнь 2026</p>
      </div>
    </section>
  );
}