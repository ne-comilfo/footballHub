import {
  type Paginated,
} from "@football-hub/contracts";

export function paginate<T>(
  items: T[],
  page: number,
  limit: number,
): Paginated<T> {
  const safeLimit = Math.max(limit, 1);
  const totalPages = Math.max(Math.ceil(items.length / safeLimit), 1);
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * safeLimit;

  return {
    items: items.slice(start, start + safeLimit),
    page: safePage,
    totalItems: items.length,
    totalPages,
  };
}

export function matchesText(value: string | null, search: string) {
  if (!search) {
    return true;
  }

  return (value ?? "").toLowerCase().includes(search.toLowerCase());
}

export function equalsOrAny(value: string | null, expected: string) {
  return !expected || value === expected;
}

export function byField<T>(
  selector: (item: T) => string | number | null,
  direction: "asc" | "desc",
) {
  return (a: T, b: T) => {
    const left = selector(a);
    const right = selector(b);
    const sign = direction === "asc" ? 1 : -1;

    if (typeof left === "string" || typeof right === "string") {
      return sign * String(left ?? "").localeCompare(String(right ?? ""));
    }

    return sign * ((left ?? 0) - (right ?? 0));
  };
}
