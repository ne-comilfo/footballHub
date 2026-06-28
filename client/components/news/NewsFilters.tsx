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

const categories = [
  "Все категории",
  "Трансферы",
  "Контракты",
  "Клубы",
  "Экипировка",
  "Тренировки",
];

export default function NewsFilters() {
  return (
    <section className="flex flex-col gap-4 rounded-xl border bg-card p-4 sm:flex-row sm:items-end sm:p-5">
      <label className="flex min-w-0 flex-1 flex-col gap-2 text-sm font-medium">
        <span>Поиск</span>
        <Input
          type="search"
          placeholder="Команда, игрок или событие"
          className="h-10 rounded-xl border-border bg-background"
        />
      </label>

      <label className="flex min-w-52 flex-col gap-2 text-sm font-medium">
        <span>Категория</span>
        <Select defaultValue={categories[0]}>
          <SelectTrigger className="h-10 w-full rounded-xl border-border bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </label>

      <Button size="lg" className="h-10 rounded-xl">
        Найти
      </Button>
    </section>
  );
}
