"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ReactNode } from "react";
import {
  AtSign,
  CalendarDays,
  Clock3,
  Heart,
  LogOut,
  Mail,
  Newspaper,
  Settings,
  Shield,
  UserRound,
} from "lucide-react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { latestNews } from "@/data/news";
import { playerDetails } from "@/data/player-details";
import { popularTeams } from "@/data/teams";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const favoriteSections = [
  {
    value: "teams",
    label: "Команды",
    icon: Shield,
  },
  {
    value: "players",
    label: "Игроки",
    icon: UserRound,
  },
  {
    value: "news",
    label: "Новости",
    icon: Newspaper,
  },
  {
    value: "matches",
    label: "Матчи",
    icon: CalendarDays,
  },
];

const isTeamEmpty = false;
const isPlayerEmpty = false;
const isNewsEmpty = true;
const isMatchEmpty = false;

const favoriteTeams = popularTeams.slice(0, 2);
const favoritePlayers = playerDetails.slice(0, 2);
const favoriteNews = latestNews.slice(0, 2);

const favoriteMatches = [
  {
    id: 1,
    tournament: "UEFA Champions League",
    date: "24 июня, 21:00",
    home: "Real Madrid",
    away: "Manchester City",
    homeLogo: "/images/teams/real-madrid.png",
    awayLogo: "/images/teams/man-city.png",
  },
  {
    id: 2,
    tournament: "Club World Cup",
    date: "27 июня, 19:30",
    home: "Barcelona",
    away: "Bayern Munich",
    homeLogo: "/images/teams/barcelona.png",
    awayLogo: "/images/teams/bayern.png",
  },
];

function EmptyFavorites({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed bg-card p-6 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

export default function Lk() {
  const [favorites, setFavorites] = useState({
    teams: favoriteTeams,
    players: favoritePlayers,
    news: favoriteNews,
    matches: favoriteMatches,
  });

  function removeFavorite(type: keyof typeof favorites, id: number) {
    setFavorites((prev) => ({
      ...prev,
      [type]: prev[type].filter((item) => item.id !== id),
    }));
  }

  const favoritesCount =
    (isTeamEmpty ? 0 : favorites.teams.map.length) +
    (isPlayerEmpty ? 0 : favorites.players.map.length) +
    (isNewsEmpty ? 0 : favorites.news.map.length) +
    (isMatchEmpty ? 0 : favorites.matches.map.length);

  return (
    <div className="mx-auto mb-8 mt-2 flex w-full max-w-5xl flex-col gap-8 px-4 sm:px-6">
      <section className="flex flex-col gap-6 rounded-xl border bg-card p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <Avatar className="size-24 sm:size-28">
            <AvatarFallback className="text-2xl font-bold">ГМ</AvatarFallback>
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-medium uppercase text-muted-foreground">
                Личный кабинет
              </p>
              <Badge variant="secondary">Активный профиль</Badge>
            </div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              ne_com1lfo
            </h1>
            <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:gap-5">
              <span className="flex items-center gap-2">
                <Mail className="size-4" />
                grisha.malyshev.06@bk.ru
              </span>
              <span className="flex items-center gap-2">
                <AtSign className="size-4" />
                frontend developer
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="rounded-xl"
          >
            <Settings data-icon="inline-start" />
            Настройки
          </Button>
          <Link
            href="/auth"
            className={buttonVariants({
              variant: "ghost",
              size: "lg",
              className: "rounded-xl",
            })}
          >
            <LogOut data-icon="inline-start" />
            Выйти
          </Link>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">В избранном</p>
          <p className="mt-2 text-3xl font-bold">{favoritesCount}</p>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">Сохранено новостей</p>
          <p className="mt-2 text-3xl font-bold">
            {isNewsEmpty ? 0 : favorites.news.map.length}
          </p>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">Профиль создан</p>
          <p className="mt-2 text-lg font-bold">Июнь 2026</p>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3">
          <Heart className="size-6" />
          <div>
            <p className="text-sm text-muted-foreground">
              Персональная коллекция
            </p>
            <h2 className="text-2xl font-bold tracking-tight">Избранное</h2>
          </div>
        </div>

        <Tabs defaultValue="teams" className="mt-5 gap-4">
          <TabsList className="grid h-auto! min-h-12 w-full grid-cols-2 rounded-xl p-1 sm:grid-cols-4">
            {favoriteSections.map(({ value, label, icon: Icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="h-10! min-h-10 rounded-lg px-3 py-2"
              >
                <Icon />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="teams">
            {isTeamEmpty ? (
              <EmptyFavorites
                icon={<Shield className="size-5" />}
                title="Избранные команды"
                description="Здесь появятся клубы, за которыми вы хотите следить."
              />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {favorites.teams.map((team) => (
                  <Link
                    key={team.id}
                    href={`/teams/${team.id}`}
                    className="group flex items-center gap-4 rounded-xl border bg-card p-5 transition-shadow hover:shadow-md"
                  >
                    <div className="relative size-16 shrink-0">
                      <Image
                        src={team.logo}
                        alt={team.name}
                        fill
                        sizes="64px"
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <Badge variant="outline">{team.country}</Badge>
                      <h3 className="mt-2 text-lg font-semibold">
                        {team.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {team.stadium} · {team.founded}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        removeFavorite("teams", team.id);
                      }}
                    >
                      <Heart className="size-5 shrink-0 fill-foreground" />
                    </button>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="players">
            {isPlayerEmpty ? (
              <EmptyFavorites
                icon={<UserRound className="size-5" />}
                title="Избранные игроки"
                description="Сохраняйте профили игроков для быстрого доступа."
              />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {favorites.players.map((player) => (
                  <Link
                    key={player.id}
                    href={`/players/${player.id}`}
                    className="group flex min-h-36 overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md"
                  >
                    <div className="relative w-32 shrink-0 bg-muted px-3 pt-3">
                      <Image
                        src={player.image}
                        alt={player.name}
                        fill
                        sizes="128px"
                        className="object-contain object-bottom transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-center p-4">
                      <div className="flex items-center justify-between gap-2">
                        <Badge variant="outline">{player.position}</Badge>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            removeFavorite("players", player.id);
                          }}
                        >
                          <Heart className="size-4 shrink-0 fill-foreground" />
                        </button>
                      </div>
                      <h3 className="mt-3 text-lg font-semibold">
                        {player.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {player.club} · {player.country}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="news">
            {isNewsEmpty ? (
              <EmptyFavorites
                icon={<Newspaper className="size-5" />}
                title="Сохраненные новости"
                description="Отложенные материалы будут собраны в этом разделе."
              />
            ) : (
              <div className="flex flex-col gap-4">
                {favorites.news.map((article) => (
                  <Link
                    key={article.id}
                    href={`/news/${article.id}`}
                    className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md sm:flex-row"
                  >
                    <div className="relative min-h-44 w-full shrink-0 bg-muted sm:w-64">
                      <Image
                        src={article.img}
                        alt={article.title}
                        fill
                        sizes="(min-width: 640px) 256px, 100vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-center p-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline">{article.category}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {article.date}
                        </span>
                      </div>
                      <h3 className="mt-3 text-xl font-semibold">
                        {article.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                        {article.descr}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="matches">
            {isMatchEmpty ? (
              <EmptyFavorites
                icon={<CalendarDays className="size-5" />}
                title="Избранные матчи"
                description="Позже здесь можно разместить календарь важных матчей."
              />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {favorites.matches.map((match) => (
                  <article
                    key={`${match.home}-${match.away}`}
                    className="rounded-xl border bg-card p-5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <Badge variant="outline">{match.tournament}</Badge>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          removeFavorite("matches", match.id);
                        }}
                      >
                        <Heart className="size-4 shrink-0 fill-foreground" />
                      </button>
                    </div>
                    <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
                      <div className="flex min-w-0 flex-col items-center gap-2">
                        <div className="relative size-14">
                          <Image
                            src={match.homeLogo}
                            alt={match.home}
                            fill
                            sizes="56px"
                            className="object-contain"
                          />
                        </div>
                        <p className="text-sm font-semibold">{match.home}</p>
                      </div>
                      <span className="text-sm font-bold text-muted-foreground">
                        VS
                      </span>
                      <div className="flex min-w-0 flex-col items-center gap-2">
                        <div className="relative size-14">
                          <Image
                            src={match.awayLogo}
                            alt={match.away}
                            fill
                            sizes="56px"
                            className="object-contain"
                          />
                        </div>
                        <p className="text-sm font-semibold">{match.away}</p>
                      </div>
                    </div>
                    <div className="mt-5 flex items-center justify-center gap-2 border-t pt-4 text-sm text-muted-foreground">
                      <Clock3 className="size-4" />
                      {match.date}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
