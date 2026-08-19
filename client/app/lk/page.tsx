"use client";

import { useState } from "react";

import FavoritesTabs from "@/components/lk/FavoritesTabs";
import ProfileStats from "@/components/lk/ProfileStats";
import QueryBoundary from "@/components/layout/QueryBoundary";

import { CalendarDays, Heart, LogOut, Mail, Settings } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useLogout, useMe } from "@/hooks/useAuth";
import { initials } from "@/lib/auth/initials";

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
  const me = useMe();
  const logout = useLogout();

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

  if (!me.data) {
    return (
      <div className="mx-auto mb-8 mt-2 flex w-full max-w-5xl flex-col gap-8 px-4 sm:px-6">
        <QueryBoundary
          query={me}
          errorText="Не удалось загрузить профиль"
          emptyText="Профиль недоступен"
        >
          {() => null}
        </QueryBoundary>
      </div>
    );
  }

  const user = me.data;
  const registeredAt = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(user.createdAt));

  return (
    <div className="mx-auto mb-8 mt-2 flex w-full max-w-5xl flex-col gap-8 px-4 sm:px-6">
      <section className="flex flex-col gap-6 rounded-xl border bg-card p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <Avatar className="size-24 sm:size-28">
            <AvatarFallback className="text-2xl font-bold">
              {initials(user.nickname)}
            </AvatarFallback>
          </Avatar>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-medium uppercase text-muted-foreground">
                Личный кабинет
              </p>

              <Badge variant="secondary">Активный профиль</Badge>
            </div>

            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              {user.nickname}
            </h1>

            <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:gap-5">
              <span className="flex items-center gap-2">
                <Mail className="size-4" />
                {user.email}
              </span>

              <span className="flex items-center gap-2">
                <CalendarDays className="size-4" />
                С нами с {registeredAt}
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

          <Button
            type="button"
            variant="ghost"
            size="lg"
            className="rounded-xl"
            disabled={logout.isPending}
            onClick={() => logout.mutate()}
          >
            <LogOut data-icon="inline-start" />
            {logout.isPending ? "Выходим..." : "Выйти"}
          </Button>
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
