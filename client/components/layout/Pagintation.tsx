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
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function getVisiblePages(current: number, total: number) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => String(index + 1));
  }

  const result: string[] = ["1"];

  if (current > 3) {
    result.push("...");
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let page = start; page <= end; page++) {
    result.push(String(page));
  }

  if (current < total - 2) {
    result.push("...");
  }

  result.push(String(total));

  return result;
}

export function PaginationDemo({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const current = Math.min(
    Math.max(Number(searchParams.get("page")) || 1, 1),
    totalPages,
  );

  function changePage(page: number) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={(event) => {
              event.preventDefault();

              if (current > 1) {
                changePage(current - 1);
              }
            }}
            className={current <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {getVisiblePages(current, totalPages).map((page, index) =>
          page === "..." ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={current === Number(page)}
                onClick={(event) => {
                  event.preventDefault();
                  changePage(Number(page));
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            onClick={(event) => {
              event.preventDefault();

              if (current < totalPages) {
                changePage(current + 1);
              }
            }}
            className={
              current >= totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
