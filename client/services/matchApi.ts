export default async function getMatchDay(date: string) {
  const response = await fetch(`/api/matches/${date}`);
  if (!response.ok) {
    throw new Error("Failed to fetch match");
  }

  const data = await response.json();
  const firstMatch = data.events.find(
    (item: { strTimestamp: string }) =>
      new Date(item.strTimestamp).getHours() > 15,
  );

  if (!firstMatch) return null;

  return firstMatch;
}
