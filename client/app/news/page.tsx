import type { Metadata } from "next";
import Link from "next/link";
import { Construction, Rss } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Новости",
  description: "Раздел новостей в разработке",
};

const PLANNED = [
  "Подключение ленты из открытых источников вместо ручного наполнения",
  "Привязка новости к команде и игроку, чтобы она появлялась на их страницах",
  "Фильтры по турнирам и клубам",
  "Сохранение материалов в избранное",
];

export default function NewsPage() {
  return (
    <div className="mx-auto mb-8 mt-2 flex w-full max-w-3xl flex-col gap-8 px-4 sm:px-6">
      <section className="overflow-hidden rounded-xl border bg-card">
        <div className="flex flex-col items-center gap-6 p-8 text-center sm:p-12">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-muted">
            <Construction className="size-8 text-muted-foreground" />
          </div>

          <div className="flex flex-col items-center gap-3">
            <Badge variant="secondary">Раздел в разработке</Badge>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Новости скоро появятся
            </h1>

            <p className="max-w-xl leading-6 text-muted-foreground">
              Сейчас идёт работа над подключением актуальных новостей из
              проверенных источников. Пока раздел закрыт, чтобы не показывать
              устаревшие материалы.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/teams"
              className={buttonVariants({ size: "lg", className: "rounded-xl" })}
            >
              Смотреть команды
            </Link>

            <Link
              href="/players"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "rounded-xl",
              })}
            >
              Смотреть игроков
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-xl border bg-card p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <Rss className="size-5 text-muted-foreground" />
          <h2 className="text-xl font-bold tracking-tight">Что будет в разделе</h2>
        </div>

        <ul className="mt-5 grid gap-3">
          {PLANNED.map((item) => (
            <li
              key={item}
              className="rounded-lg border bg-background px-4 py-3 text-sm leading-6 text-muted-foreground"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
