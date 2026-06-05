import Hero from "@/components/home/Hero";
import PopularTeams from "@/components/home/PopularTeams";
import PopularPlayers from "@/components/home/PopularPlayers";
import LatestNews from "@/components/home/LatestNews";

export default function Home() {
  return (
    <div className="flex flex-col gap-5 justify-center">
      <Hero />
      <PopularTeams />
      <PopularPlayers />
      <LatestNews />
    </div>
  );
}
