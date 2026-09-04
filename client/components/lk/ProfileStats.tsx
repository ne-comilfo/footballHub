type ProfileStatsProps = {
  teamsCount: number;
  playersCount: number;
  createdAt: string;
};

export default function ProfileStats({
  teamsCount,
  playersCount,
  createdAt,
}: ProfileStatsProps) {
  const created = new Date(createdAt);
  const registered = Number.isNaN(created.getTime())
    ? "—"
    : new Intl.DateTimeFormat("ru-RU", {
        month: "long",
        year: "numeric",
      }).format(created);

  return (
    <section className="grid gap-3 sm:grid-cols-3">
      <div className="rounded-xl border bg-card p-5">
        <p className="text-sm text-muted-foreground">Команд в избранном</p>
        <p className="mt-2 text-3xl font-bold">{teamsCount}</p>
      </div>

      <div className="rounded-xl border bg-card p-5">
        <p className="text-sm text-muted-foreground">Игроков в избранном</p>
        <p className="mt-2 text-3xl font-bold">{playersCount}</p>
      </div>

      <div className="rounded-xl border bg-card p-5">
        <p className="text-sm text-muted-foreground">Профиль создан</p>
        <p className="mt-2 text-lg font-bold capitalize">{registered}</p>
      </div>
    </section>
  );
}
