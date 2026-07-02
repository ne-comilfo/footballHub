export async function getTeamFixtures(id: string) {
  const response = await fetch(`/api/fixtures/${id}`);

  if (!response.ok) {
    throw new Error("Failed to load last games");
  }

  const data = await response.json();
  const filterData = data.response
    .sort(
      (a: { fixture: { date: string } }, b: { fixture: { date: string } }) => {
        return (
          new Date(a.fixture.date).getTime() -
          new Date(b.fixture.date).getTime()
        );
      },
    )
    .slice(0, 5);
  return filterData;
}
