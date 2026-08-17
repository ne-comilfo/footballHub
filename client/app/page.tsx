import Hero from "@/components/home/Hero";
import PopularTeams from "@/components/home/PopularTeams";
import PopularPlayers from "@/components/home/PopularPlayers";
import MatchOfTheDay from "@/components/home/MatchOfDay";
import NearestMatches from "@/components/home/NearestMatches";
import LatestResults from "@/components/home/LatestResults";
import LatestNews from "@/components/home/LatestNews";
import TopScorers from "@/components/home/TopScorers";
import Statistics from "@/components/home/Statictics";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 mb-5">
      <Hero />
      <PopularTeams />
      <PopularPlayers />
      <MatchOfTheDay />
      <NearestMatches />
      <LatestResults />
      {/* <LatestNews /> */}
      {/* <TopScorers /> */}
      <Statistics />
    </div>
  );
}
