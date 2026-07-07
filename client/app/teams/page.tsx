"use client";

import TeamCard from "@/components/teams/TeamCard";
import TeamsFilters from "@/components/teams/TeamsFilters";
import { PaginationDemo } from "@/components/layout/Pagintation";
import QueryBoundary from "@/components/layout/QueryBoundary";
import { useAllTeams } from "@/hooks/useAllTeams";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function FootballTeams() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function getValidPage(value: string | null) {
    const page = Number(value);

    if (!Number.isInteger(page) || page < 1) {
      return "1";
    }

    return String(page);
  }

  const page = getValidPage(searchParams.get("page"));

  useEffect(() => {
    if (page !== searchParams.get("page")) {
      const params = new URLSearchParams(searchParams.toString());

      params.set("page", page);

      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [page, pathname, router, searchParams]);

  const filters = {
    ...Object.fromEntries(searchParams.entries()),
    page: Number(page),
  };

  const { data, error, isLoading, isFetching } = useAllTeams(filters);

  if (isLoading || error || !data) {
    return (
      <QueryBoundary
        isLoading={isLoading}
        loadingText="Загрузка..."
        error={error}
        errorText="Ошибка при загрузке данных"
        data={data}
        emptyText="Нет данных"
      />
    );
  }

  return (
    <div className="mx-auto mt-2 mb-8 flex w-full max-w-5xl flex-col gap-8 px-4 sm:px-6">
      <section className="rounded-xl border bg-card p-6 sm:p-8">
        <p className="text-sm font-medium uppercase text-muted-foreground">
          Football Hub
        </p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          Команды
        </h1>

        <p className="mt-4 max-w-2xl text-muted-foreground">
          Выберите клуб и перейдите на страницу команды с составом, последними
          результатами, новостями и краткой статистикой.
        </p>
      </section>

      <TeamsFilters />

      {isFetching && (
        <div className="mb-4 self-center text-lg text-muted-foreground">
          Обновляем список...
        </div>
      )}

      {!isFetching && (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((team) => (
            <TeamCard key={team.idAPIfootball} team={team} />
          ))}

          <div className="col-span-full mt-5 flex justify-center">
            <PaginationDemo
              pages={data.map((_, index) => String(index + 1))}
            />
          </div>
        </section>
      )}
    </div>
  );
}
