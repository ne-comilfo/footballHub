
import Link from "next/link";
import {
  Code2,
  Database,
  Layers3,
  Send,
  Server,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const technologyGroups = [
  {
    title: "Frontend",
    icon: Code2,
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
    ],
  },
  {
    title: "Состояние и данные",
    icon: Layers3,
    technologies: ["TanStack Query", "Zustand"],
  },
  {
    title: "Backend",
    icon: Server,
    technologies: ["Node.js", "Express.js"],
  },
  {
    title: "База данных",
    icon: Database,
    technologies: ["PostgreSQL"],
  },
];

const interests = [
  "Пользовательские интерфейсы",
  "Архитектура веб-приложений",
  "Fullstack-разработка",
  "Спортивные веб-сервисы",
];

const plannedTechnologies = ["Prisma ORM", "JWT-аутентификация", "REST API"];

export default function AboutPage() {
  return (
    <div className="mx-auto mb-8 mt-2 flex w-full max-w-5xl flex-col gap-8 px-4 sm:px-6">
      <section className="flex flex-col gap-6 rounded-xl border bg-card p-6 sm:p-8">
        <Avatar className="size-28 sm:size-32">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="text-3xl font-bold">ГМ</AvatarFallback>
        </Avatar>

        <div>
          <p className="text-sm font-medium uppercase text-muted-foreground">
            Автор Football Hub
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Обо мне
          </h1>
        </div>

        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
          Я frontend-разработчик, изучаю современные технологии
          веб-разработки и создаю pet-проекты для развития практических
          навыков. Мой основной стек включает React, Next.js, TypeScript и
          Tailwind CSS.
        </p>

        <div className="flex flex-wrap gap-2">
          {interests.map((interest) => (
            <Badge key={interest} variant="secondary">
              {interest}
            </Badge>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="https://github.com/ne-comilfo"
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ size: "lg", className: "rounded-xl" })}
          >
            <FaGithub data-icon="inline-start" />
            GitHub
          </Link>
          <Link
            href="https://t.me/ne_com1lfo"
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "rounded-xl",
            })}
          >
            <Send data-icon="inline-start" />
            Telegram
          </Link>
        </div>
      </section>

      <section className="grid gap-6 border-y py-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Pet-проект</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            О проекте Football Hub
          </h2>
          <div className="mt-5 flex flex-col gap-4 leading-7 text-muted-foreground">
            <p>
              Football Hub посвящен футбольной статистике, игрокам, командам и
              новостям. Проект объединяет мой интерес к разработке и футболу.
            </p>
            <p>
              Текущая версия работает на моковых данных. В дальнейшем я
              планирую подключить сторонние футбольные API для актуальной
              информации о матчах, командах и игроках.
            </p>
            <p>
              Цель проекта — улучшить навыки frontend и fullstack-разработки и
              собрать полноценное приложение для портфолио.
            </p>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5 sm:p-6">
          <h3 className="text-lg font-semibold">Пользовательский функционал</h3>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
            <li className="border-b pb-3">Избранные команды</li>
            <li className="border-b pb-3">Избранные игроки</li>
            <li className="border-b pb-3">Профиль пользователя</li>
            <li>Персональные настройки</li>
          </ul>
        </div>
      </section>

      <section>
        <p className="text-sm font-medium text-muted-foreground">
          Технологии и инструменты
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight">Стек проекта</h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {technologyGroups.map(({ title, icon: Icon, technologies }) => (
            <div key={title} className="rounded-xl border bg-card p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-lg font-semibold">{title}</h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {technologies.map((technology) => (
                  <Badge key={technology} variant="outline">
                    {technology}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Следующий этап
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            Планируемые технологии
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {plannedTechnologies.map((technology) => (
              <Badge key={technology}>{technology}</Badge>
            ))}
          </div>
        </div>

        <Link
          href="/"
          className={buttonVariants({
            variant: "outline",
            size: "lg",
            className: "rounded-xl",
          })}
        >
          Вернуться на главную
        </Link>
      </section>
    </div>
  );
}
