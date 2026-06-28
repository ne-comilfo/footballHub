import Link from "next/link";

export default function Hero() {
  return (
    <section className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
      <h1 id="" className="mb-6 scroll-mt-16 text-5xl font-bold tracking-tight md:text-7xl">
        Football Hub
      </h1>

      <p className="mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
        Все о командах, игроках и футбольной статистике в одном месте.
      </p>

      <div className="mb-10 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/teams"
          className="rounded-md border px-6 py-3 transition-colors hover:bg-accent"
        >
          Команды
        </Link>

        <Link
          href="/players"
          className="rounded-md border px-6 py-3 transition-colors hover:bg-accent"
        >
          Игроки
        </Link>
      </div>

      <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
        <span>⚽ 100+ команд</span>
        <span>👤 1000+ игроков</span>
        <span>📰 Актуальные новости</span>
      </div>
    </section>
  );
}
