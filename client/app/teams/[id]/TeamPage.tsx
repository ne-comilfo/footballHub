"use client";

import { useParams } from "next/navigation";

import QueryBoundary from "@/components/layout/QueryBoundary";
import TeamHero from "@/components/teams/TeamHero";
import TeamNavigation from "@/components/teams/TeamNavigation";
import TeamResults from "@/components/teams/TeamResults";
import TeamSquad from "@/components/teams/TeamSquad";
import TeamStats from "@/components/teams/TeamStats";
import { useTeam } from "@/hooks/useTeams";

export default function TeamPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const query = useTeam(id);

  return (
    <div className="mx-auto mb-8 flex w-full max-w-5xl flex-col gap-8 px-4 sm:px-6">
      <QueryBoundary query={query} errorText="Не удалось загрузить команду">
        {(team) => (
          <>
            <TeamHero team={team} />
            <TeamStats id={team.id} />
            <TeamSquad teamId={team.id} />
            <TeamResults teamId={team.id} />
            <TeamNavigation />
          </>
        )}
      </QueryBoundary>
    </div>
  );
}
