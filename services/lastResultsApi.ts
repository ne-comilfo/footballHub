export async function getLastResult(date: string) {
  const response = await fetch(
    `https://www.thesportsdb.com/api/v1/json/123/eventsday.php?d=${date}&s=Soccer&l=4429`,
  );
  if (!response.ok) {
    return [];
  }

  const data = await response.json();
  const dataFilter = data.events.filter(
    (event: any) => event.intAwayScore !== null && event.intHomeScore !== null,
  );

  return dataFilter;
}

export async function getLastResults() {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const todayStr = today.toISOString().split("T")[0];
  const yesterdayStr = yesterday.toISOString().split("T")[0];
  const days = [todayStr, yesterdayStr];
  const results = (
    await Promise.all(days.map((date) => getLastResult(date)))
  ).flat().sort(
    (a, b) =>
      new Date(b.strTimestamp).getTime() - new Date(a.strTimestamp).getTime(),
  );

  return results.slice(0, 5);
}
