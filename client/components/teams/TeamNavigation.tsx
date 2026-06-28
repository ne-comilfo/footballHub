import Link from "next/link";

export default function TeamNavigation() {
  return (
    <nav className="flex flex-col gap-3 sm:flex-row">
      <Link
        href="/teams"
        className="inline-flex h-10 items-center justify-center rounded-xl border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted"
      >
        Назад к командам
      </Link>
      <Link
        href="/players"
        className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
      >
        Все игроки команды
      </Link>
    </nav>
  );
}
