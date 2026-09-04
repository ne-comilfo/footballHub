"use client";

import Image from "next/image";
import Link from "next/link";

import EmptyFavorites from "@/components/lk/EmptyFavorites";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  CalendarDays,
  Clock3,
  Heart,
  Newspaper,
  Shield,
  UserRound,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

import type { Favorites } from "./favorites";

import { favoriteSections } from "@/components/lk/favorites";

export default function FavoritesTabs({
  favorites,
  setFavorites,
}: {
  favorites: Favorites;
  setFavorites: React.Dispatch<React.SetStateAction<Favorites>>;
}) {
  function removeFavorite(type: keyof typeof favorites, id: number) {
    setFavorites((prev) => ({
      ...prev,
      [type]: prev[type].filter((item) => item.id !== id),
    }));
  }

  return (
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
        {favorites.teams.length === 0 ? (
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
                  <h3 className="mt-2 text-lg font-semibold">{team.name}</h3>
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
        {favorites.players.length === 0 ? (
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
                  <h3 className="mt-3 text-lg font-semibold">{player.name}</h3>
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
        {favorites.news.length === 0 ? (
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
        {favorites.matches.length === 0 ? (
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
  );
}
