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
import { Slider } from "@/components/ui/slider";
import { DraftFilters } from "@/types/team";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  DEFAULT_FILTERS,
  countries,
  competitions,
  sortOptions,
} from "@/data/teams";

function FilterSelect({
  name,
  label,
  options,
  value,
  setDraftFilters,
}: {
  name: string;
  label: string;
  options: string[];
  value: string;
  setDraftFilters: React.Dispatch<React.SetStateAction<DraftFilters>>;
}) {
  return (
    <label className="flex min-w-0 h-full flex-col gap-2 justify-between text-sm font-medium">
      <div>{label}</div>
      <Select
        value={value || options[0]}
        onValueChange={(newValue) => {
          setDraftFilters((prev) => ({
            ...prev,
            [name]: newValue,
          }));
        }}
      >
        <SelectTrigger className="h-10 w-full rounded-xl border-border bg-background">
          <SelectValue />
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false} sideOffset={4}>
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

function getValidValue(
  value: string | null,
  options: readonly string[],
  defaultValue: string,
) {
  return value && options.includes(value) ? value : defaultValue;
}

export default function TeamsFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const isFirstSearchRender = useRef(true);
  const [searchInput, setSearchInput] = useState<string>(
    searchParams.get("search") ?? "",
  );

  const getFiltersFromURL = useCallback((): DraftFilters => {
    return {
      country:
        getValidValue(
          searchParams.get("country"),
          countries,
          DEFAULT_FILTERS.country,
        ) ?? DEFAULT_FILTERS.country,
      foundedFrom:
        searchParams.get("foundedFrom") ?? DEFAULT_FILTERS.foundedFrom,
      foundedTo: searchParams.get("foundedTo") ?? DEFAULT_FILTERS.foundedTo,
      competition:
        getValidValue(
          searchParams.get("competition"),
          competitions,
          DEFAULT_FILTERS.competition,
        ) ?? DEFAULT_FILTERS.competition,
      sort:
        getValidValue(
          searchParams.get("sort"),
          sortOptions,
          DEFAULT_FILTERS.sort,
        ) ?? DEFAULT_FILTERS.sort,
    };
  }, [searchParams]);

  function setFilterParamsToURL<T extends Record<string, string>>(data: T) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(data).forEach(([key, value]) => {
      params.set(key, value);
    });

    router.replace(`${pathname}?${params.toString()}`);
  }

  const [draftFilters, setDraftFilters] = useState(getFiltersFromURL);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    let changed = false;

    Object.entries(DEFAULT_FILTERS).forEach(([key, value]) => {
      if (!params.has(key)) {
        params.set(key, value);
        changed = true;
      }
    });

    if (changed) {
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [pathname, router, searchParams]);

  useEffect(() => {
    setDraftFilters(getFiltersFromURL());
  }, [getFiltersFromURL]);

  useEffect(() => {
    if (isFirstSearchRender.current) {
      isFirstSearchRender.current = false;
      return;
    }

    const nextSearch = searchInput.trim();
    const currentSearch = searchParams.get("search") ?? "";

    if (nextSearch === currentSearch) {
      return;
    }

    const timerId = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (nextSearch) {
        params.set("search", nextSearch);
      } else {
        params.delete("search");
      }

      router.push(`${pathname}?${params.toString()}`);
    }, 300);

    return () => clearTimeout(timerId);
  }, [pathname, router, searchInput, searchParams]);

  const currentFilters = getFiltersFromURL();
  const hasChanges =
    JSON.stringify(draftFilters) !== JSON.stringify(currentFilters);

  return (
    <section className="rounded-xl border bg-card p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.5fr] items-center">
        <label className="flex min-w-0 h-full flex-col justify-between gap-2 text-sm font-medium">
          <span>Поиск</span>
          <Input
            type="search"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            placeholder="Название команды"
            className="h-8 rounded-xl border-border bg-background"
          />
        </label>

        <FilterSelect
          name="country"
          value={draftFilters.country}
          label="Страна"
          options={countries}
          setDraftFilters={setDraftFilters}
        />
        <FilterSelect
          name="competition"
          value={draftFilters.competition}
          label="Турнир"
          options={competitions}
          setDraftFilters={setDraftFilters}
        />
        <FilterSelect
          name="sort"
          value={draftFilters.sort}
          label="Сортировка"
          options={sortOptions}
          setDraftFilters={setDraftFilters}
        />
        <div className="space-y-2">
          <span className="text-sm font-medium">Год основания</span>

          <div className="flex justify-between text-xs font-medium">
            <span>{draftFilters.foundedFrom}</span>
            <span>{draftFilters.foundedTo}</span>
          </div>

          <Slider
            value={[+draftFilters.foundedFrom, +draftFilters.foundedTo]}
            onValueChange={(value) => {
              const [from, to] = value as number[];
              setDraftFilters((prev) => ({
                ...prev,
                foundedFrom: from + "",
                foundedTo: to + "",
              }));
            }}
            min={1880}
            max={2026}
            step={1}
          />

          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1880</span>
            <span>2026</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          variant="outline"
          size="lg"
          onClick={() => {
            setDraftFilters(DEFAULT_FILTERS);
            setFilterParamsToURL(DEFAULT_FILTERS);
          }}
        >
          Сбросить
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="lg"
            disabled={!hasChanges}
            onClick={() => {
              setDraftFilters(getFiltersFromURL());
            }}
          >
            Отменить
          </Button>
          <Button
            disabled={!hasChanges}
            size="lg"
            onClick={() => {
              setFilterParamsToURL(draftFilters);
            }}
          >
            Применить
          </Button>
        </div>
      </div>
    </section>
  );
}
