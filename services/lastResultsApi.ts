export async function getLastResult(date: string) {
  const response = await fetch(
    `https://www.thesportsdb.com/api/v1/json/123/eventsday.php?d=${date}&s=Soccer`,
  );
  if (!response.ok) {
    return {
      dataLatest: [],
      dataNearest: [],
    };
  }

  const data = await response.json();
  const dataLatest = data.events.filter(
    (event: any) => event.strStatus === "FT",
  );

  const dataNearest = data.events.filter(
    (event: any) => event.strStatus !== "FT",
  );

  return { dataLatest, dataNearest };
}

export async function getLastResults() {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const todayStr = today.toISOString().split("T")[0];
  const yesterdayStr = yesterday.toISOString().split("T")[0];
  const days = [todayStr, yesterdayStr];
  const results = await Promise.all(days.map((date) => getLastResult(date)));

  const latest = results
    .flatMap((item) => item.dataLatest)
    .sort(
      (a, b) =>
        new Date(b.strTimestamp).getTime() - new Date(a.strTimestamp).getTime(),
    );

  const nearest = results
    .flatMap((item) => item.dataNearest)
    .sort(
      (a, b) =>
        new Date(a.strTimestamp).getTime() - new Date(b.strTimestamp).getTime(),
    );

  return {
    latest: latest.slice(0, 5),
    nearest: nearest.slice(0, 5),
  };
}
