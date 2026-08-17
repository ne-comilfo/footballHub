const MOSCOW = "Europe/Moscow";

export function todayInMoscow() {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: MOSCOW }).format(
    new Date(),
  );
}

export function formatKickoff(kickoff: string | null) {
  if (!kickoff) {
    return "";
  }

  const date = new Date(kickoff);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("ru-RU", {
    timeZone: MOSCOW,
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function formatTime(kickoff: string | null) {
  if (!kickoff) {
    return "";
  }

  const date = new Date(kickoff);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("ru-RU", {
    timeZone: MOSCOW,
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function formatDateTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("ru-RU", {
    timeZone: MOSCOW,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
