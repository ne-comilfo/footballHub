const countries = ["Все страны", "Spain", "England", "Germany", "France"];
const foundedFrom = ["От", "1880", "1890", "1900", "1950"];
const foundedTo = ["До", "1900", "1950", "2000", "2026"];
const competitions = [
  "Все турниры",
  "Champions League",
  "Premier League",
  "La Liga",
  "Bundesliga",
  "Ligue 1",
];
const sortOptions = [
  "По популярности",
  "По названию",
  "По трофеям",
  "По году основания",
];

function FilterSelect({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  return (
    <label className="flex min-w-0 flex-col gap-2 text-sm font-medium">
      <span>{label}</span>
      <select className="h-10 rounded-xl border bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

export default function TeamsFilters() {
  return (
    <section className="rounded-xl border bg-card p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr_1fr]">
        <label className="flex min-w-0 flex-col gap-2 text-sm font-medium">
          <span>Поиск</span>
          <input
            type="search"
            placeholder="Название команды"
            className="h-10 rounded-xl border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
          />
        </label>

        <FilterSelect label="Страна" options={countries} />
        <FilterSelect label="Основана от" options={foundedFrom} />
        <FilterSelect label="Основана до" options={foundedTo} />
        <FilterSelect label="Турнир" options={competitions} />
        <FilterSelect label="Сортировка" options={sortOptions} />
      </div>
    </section>
  );
}
