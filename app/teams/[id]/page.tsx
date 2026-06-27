"use client";

import { teamDetails } from "@/data/team-details";
import TeamHero from "@/components/teams/TeamHero";
import TeamNavigation from "@/components/teams/TeamNavigation";
import TeamNews from "@/components/teams/TeamNews";
import TeamResults from "@/components/teams/TeamResults";
import TeamSquad from "@/components/teams/TeamSquad";
import TeamStats from "@/components/teams/TeamStats";

import { useTeamsApiFootbal } from "@/hooks/useTeams";
import { useTeam } from "@/hooks/useTeams";
import QueryBoundary from "@/components/layout/QueryBoundary";
import { useParams } from "next/navigation";

export default function TeamPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: teamTemp } = useTeam(id);
  const footballId = teamTemp?.idAPIfootball;
  const { data, isLoading, error } = useTeamsApiFootbal(footballId);

  if (isLoading || error || !data) {
    return (
      <QueryBoundary
        isLoading={isLoading}
        loadingText="Загрузка..."
        error={error}
        errorText="Ошибка при загрузке данных"
        data={data}
        emptyText="Нет данных"
      />
    );
  }

  const team =
    teamDetails.find((item) => item.id === Number(id)) ?? teamDetails[0];

  return (
    <div className="mx-auto mb-8 flex w-full max-w-5xl flex-col gap-8 px-4 sm:px-6">
      <TeamHero team={data} logo={teamTemp.strBadge}/>
      <TeamStats stats={team.stats} />
      <TeamSquad squad={team.squad} />
      <TeamResults results={team.results} />
      <TeamNews news={team.news} />
      <TeamNavigation />
    </div>
  );
}
