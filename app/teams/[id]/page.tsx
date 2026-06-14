import { teamDetails } from "@/data/team-details";
import TeamHero from "@/components/teams/TeamHero";
import TeamNavigation from "@/components/teams/TeamNavigation";
import TeamNews from "@/components/teams/TeamNews";
import TeamResults from "@/components/teams/TeamResults";
import TeamSquad from "@/components/teams/TeamSquad";
import TeamStats from "@/components/teams/TeamStats";

type TeamPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TeamPage({ params }: TeamPageProps) {
  const { id } = await params;
  const team = teamDetails.find((item) => item.id === Number(id)) ?? teamDetails[0];

  return (
    <div className="mx-auto mb-8 flex w-full max-w-5xl flex-col gap-8 px-4 sm:px-6">
      <TeamHero team={team} />
      <TeamStats stats={team.stats} />
      <TeamSquad squad={team.squad} />
      <TeamResults results={team.results} />
      <TeamNews news={team.news} />
      <TeamNavigation />
    </div>
  );
}
