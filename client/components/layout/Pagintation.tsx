"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export function PaginationDemo({ pages }: { pages: string[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const params = new URLSearchParams(searchParams.toString());

  const current = Number(searchParams.get("page") ?? 1);
  const total = Number(pages[pages.length - 1] ?? 1);

  function changePage(page: number) {
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  }

  function getVisiblePages(current: number, total: number) {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => String(i + 1));
    }

    const result: (string | "...")[] = [];

    result.push("1");

    if (current > 3) {
      result.push("...");
    }

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
      result.push(String(i));
    }

    if (current < total - 2) {
      result.push("...");
    }

    result.push(String(total));

    return result;
  }

  const visiblePages = getVisiblePages(current, total);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault();

              if (current > 1) {
                changePage(current - 1);
              }
            }}
            className={
              current <= 1 ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>

        {visiblePages.map((page, index) =>
          page === "..." ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={current === Number(page)}
                onClick={(e) => {
                  e.preventDefault();
                  changePage(Number(page));
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault();

              if (current < total) {
                changePage(current + 1);
              }
            }}
            className={
              current >= total ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}