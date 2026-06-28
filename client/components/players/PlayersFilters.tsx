"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const countries = ["Все страны", "Argentina", "Brazil", "England", "Portugal", "Russia", "Spain"];
const positions = ["Все позиции", "Forward", "Winger", "Goalkeeper"];
const clubs = ["Все клубы", "Al Nassr", "Barcelona", "Bayern Munich", "Inter Miami", "PSG", "Santos"];
const sortOptions = ["По популярности", "По голам", "По ассистам", "По рейтингу", "По возрасту"];

function FilterSelect({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="flex min-w-0 flex-col gap-2 text-sm font-medium">
      <span>{label}</span>
      <Select defaultValue={options[0]}>
        <SelectTrigger className="h-10 w-full rounded-xl border-border bg-background">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}

export default function PlayersFilters() {
  return (
    <section className="rounded-xl border bg-card p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
        <label className="flex min-w-0 flex-col gap-2 text-sm font-medium">
          <span>Поиск</span>
          <Input
            type="search"
            placeholder="Имя игрока"
            className="h-10 rounded-xl border-border bg-background"
          />
        </label>

        <FilterSelect label="Страна" options={countries} />
        <FilterSelect label="Позиция" options={positions} />
        <FilterSelect label="Клуб" options={clubs} />
        <FilterSelect label="Сортировка" options={sortOptions} />
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-3 text-sm font-medium">
          <Switch />
          Только с высокой формой
        </label>
        <div className="flex gap-2">
          <Button variant="outline" size="lg">
            Сбросить
          </Button>
          <Button size="lg">Показать</Button>
        </div>
      </div>
    </section>
  );
}
