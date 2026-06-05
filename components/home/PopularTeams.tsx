import TeamCard from "./TeamCard";
import { popularTeams } from "@/data/teams";

export default function PopularTeams() {
    return (
        <div className="items-center flex flex-col">
            <h2 className="font-bold text-3xl text-center items-center mb-5">Популярные команды</h2>
            <div className="grid grid-cols-3 gap-4">
                {popularTeams.map(item => (
                    <TeamCard key={item.id} {...item}/>
                ))}
            </div>
        </div>
    );
}