"use client";

import Link from "next/link";
import { useState } from "react";

import FavoritesTabs from "@/components/lk/FavoritesTabs";
import ProfileStats from "@/components/lk/ProfileStats";

import { AtSign, Heart, LogOut, Mail, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";

import {
  favoriteTeams,
  favoritePlayers,
  favoriteNews,
  favoriteMatches,
} from "@/components/lk/favorites";

export type Favorites = {
  teams: typeof favoriteTeams;
  players: typeof favoritePlayers;
  news: typeof favoriteNews;
  matches: typeof favoriteMatches;
};

export default function Lk() {
  const [favorites, setFavorites] = useState({
    teams: favoriteTeams,
    players: favoritePlayers,
    news: favoriteNews,
    matches: favoriteMatches,
  });

  const favoritesCount =
    favorites.teams.length +
    favorites.players.length +
    favorites.news.length +
    favorites.matches.length;

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

      <ProfileStats
        favoritesCount={favoritesCount}
        newsCount={favorites.news.length}
      />

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

        <FavoritesTabs favorites={favorites} setFavorites={setFavorites} />
      </section>
    </div>
  );
}
