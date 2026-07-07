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
import {
  DEFAULT_PLAYER_FILTERS,
  playerClubs,
  playerCountries,
  playerPositions,
  playerSortOptions,
} from "@/data/player-filters";
import { PlayerFilters } from "@/types/player";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

function FilterSelect({
  name,
  label,
  options,
  value,
  setDraftFilters,
}: {
  name: keyof PlayerFilters;
  label: string;
  options: string[];
  value: string;
  setDraftFilters: React.Dispatch<React.SetStateAction<PlayerFilters>>;
}) {
  return (
    <label className="flex h-full min-w-0 flex-col justify-between gap-2 text-sm font-medium">
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

export default function PlayersFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const isFirstSearchRender = useRef(true);

  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") ?? "",
  );

  const getValidValue = useCallback(
    (value: string | null, options: readonly string[], defaultValue: string) =>
      value && options.includes(value) ? value : defaultValue,
    [],
  );

  const getFiltersFromURL = useCallback((): PlayerFilters => {
    return {
      page: searchParams.get("page") ?? DEFAULT_PLAYER_FILTERS.page,
      limit: searchParams.get("limit") ?? DEFAULT_PLAYER_FILTERS.limit,
      country: getValidValue(
        searchParams.get("country"),
        playerCountries,
        DEFAULT_PLAYER_FILTERS.country,
      ),
      position: getValidValue(
        searchParams.get("position"),
        playerPositions,
        DEFAULT_PLAYER_FILTERS.position,
      ),
      club: getValidValue(
        searchParams.get("club"),
        playerClubs,
        DEFAULT_PLAYER_FILTERS.club,
      ),
      sort: getValidValue(
        searchParams.get("sort"),
        playerSortOptions,
        DEFAULT_PLAYER_FILTERS.sort,
      ),
    };
  }, [getValidValue, searchParams]);

  const replaceParams = useCallback(
    (params: URLSearchParams) => {
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname);
    },
    [pathname, router],
  );

  const [draftFilters, setDraftFilters] = useState(getFiltersFromURL);

  function setFilterParamsToURL(data: PlayerFilters) {
    const params = new URLSearchParams(searchParams.toString());
    const filterKeys = [
      "search",
      "page",
      "limit",
      "country",
      "position",
      "club",
      "sort",
    ];

    filterKeys.forEach((key) => {
      params.delete(key);
    });

    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    params.set("page", "1");
    replaceParams(params);
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    let changed = false;

    Object.entries(DEFAULT_PLAYER_FILTERS).forEach(([key, value]) => {
      if (!params.has(key)) {
        params.set(key, value);
        changed = true;
      }
    });

    if (changed) {
      replaceParams(params);
    }
  }, [replaceParams, searchParams]);

  useEffect(() => {
    setDraftFilters(getFiltersFromURL());
  }, [getFiltersFromURL, searchParams]);

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

      params.set("page", "1");

      replaceParams(params);
    }, 300);

    return () => clearTimeout(timerId);
  }, [pathname, replaceParams, searchInput, searchParams]);

  const currentFilters = getFiltersFromURL();
  const hasChanges =
    JSON.stringify(draftFilters) !== JSON.stringify(currentFilters);

  return (
    <section className="rounded-xl border bg-card p-4 sm:p-5">
      <div className="grid items-center gap-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
        <label className="flex h-15 min-w-0 flex-col justify-between gap-2 text-sm font-medium">
          <span>Поиск</span>
          <Input
            type="search"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            placeholder="Имя игрока"
            className="h-10 rounded-xl border-border bg-background"
          />
        </label>

        <FilterSelect
          name="country"
          value={draftFilters.country}
          label="Страна"
          options={playerCountries}
          setDraftFilters={setDraftFilters}
        />
        <FilterSelect
          name="position"
          value={draftFilters.position}
          label="Позиция"
          options={playerPositions}
          setDraftFilters={setDraftFilters}
        />
        <FilterSelect
          name="club"
          value={draftFilters.club}
          label="Клуб"
          options={playerClubs}
          setDraftFilters={setDraftFilters}
        />
        <FilterSelect
          name="sort"
          value={draftFilters.sort}
          label="Сортировка"
          options={playerSortOptions}
          setDraftFilters={setDraftFilters}
        />
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          variant="outline"
          size="lg"
          onClick={() => {
            setDraftFilters(DEFAULT_PLAYER_FILTERS);
            setFilterParamsToURL(DEFAULT_PLAYER_FILTERS);
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
