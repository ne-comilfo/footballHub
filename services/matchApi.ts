export default async function getMatchDay(date: string) {
  const response = await fetch(
    `https://www.thesportsdb.com/api/v1/json/123/eventsday.php?d=${date}&s=Soccer&l=4429`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch match");
  }

  const data = await response.json();
  const firstMatch = data.events.find(
    (item: any) => new Date(item.strTimestamp).getHours() > 15,
  );

  return firstMatch;
}
