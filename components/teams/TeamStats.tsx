import { TeamStat } from "@/types/team";

type TeamStatsProps = {
  stats: TeamStat[];
};

export default function TeamStats({ stats }: TeamStatsProps) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">{stat.label}</p>
          <p className="mt-2 text-3xl font-bold">{stat.value}</p>
        </div>
      ))}
    </section>
  );
}
