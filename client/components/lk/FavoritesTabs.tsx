"use client";

import { Shield, UserRound } from "lucide-react";
import type { Favorites } from "@football-hub/contracts";

import PlayerCard from "@/components/players/PlayerCard";
import TeamCard from "@/components/teams/TeamCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmptyFavorites from "./EmptyFavorites";

export default function FavoritesTabs({ favorites }: { favorites: Favorites }) {
  return (
    <Tabs defaultValue="teams" className="mt-5 gap-6">
      <TabsList className="grid h-11 w-full grid-cols-2 rounded-xl sm:w-80">
        <TabsTrigger value="teams" className="rounded-lg">
          Команды ({favorites.teams.length})
        </TabsTrigger>
        <TabsTrigger value="players" className="rounded-lg">
          Игроки ({favorites.players.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="teams">
        {favorites.teams.length === 0 ? (
          <EmptyFavorites
            icon={<Shield className="size-6 text-muted-foreground" />}
            title="Пока нет команд"
            description="Откройте каталог команд и нажмите сердечко на карточке, чтобы клуб появился здесь."
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.teams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="players">
        {favorites.players.length === 0 ? (
          <EmptyFavorites
            icon={<UserRound className="size-6 text-muted-foreground" />}
            title="Пока нет игроков"
            description="Откройте каталог игроков и нажмите сердечко на карточке, чтобы футболист появился здесь."
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.players.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
