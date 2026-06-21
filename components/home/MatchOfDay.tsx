import Image from "next/image";

interface TeamMatchProps {
  name: string;
}
const teams: TeamMatchProps[] = [
  { name: "Real Madrid" },
  { name: "Manchester City" },
];

function TeamMatch({ name }: TeamMatchProps) {
  return <h3 className="sm:text-2xl text-xl font-bold text-center">{name}</h3>;
}

export default function MatchOfTheDay() {
  return (
    <section className="w-full">
      <h2 className="mb-5 text-center text-3xl font-bold">Матч дня</h2>

      <div className="rounded-2xl border p-8 transition-all hover:shadow-lg">
        <div className="mb-6 text-center text-sm text-muted-foreground">
          UEFA Champions League
        </div>

        <div className="flex items-center justify-between gap-8">
          <div className="flex flex-1 flex-col items-center">
            <Image
              src="/images/teams/real-madrid.png"
              alt="Real Madrid"
              width={80}
              height={80}
              className="mb-4 h-20 w-20 object-contain"
            />

            <TeamMatch name={teams[0].name}/>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold">VS</span>

            <span className="mt-2 text-sm text-muted-foreground">
              Сегодня 21:00
            </span>
          </div>

          <div className="flex flex-1 flex-col items-center">
            <Image
              src="/images/teams/man-city.png"
              alt="Manchester City"
              width={80}
              height={80}
              className="mb-4 h-20 w-20 object-contain"
            />

            <TeamMatch name={teams[1].name}/>
          </div>
        </div>
      </div>
    </section>
  );
}
