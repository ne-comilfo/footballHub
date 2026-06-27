export async function apiFootballFetch(endpoint: string) {
  const response = await fetch(
    `${process.env.API_FOOTBALL_BASE_URL}${endpoint}`,
    {
      headers: {
        "x-apisports-key": process.env.API_FOOTBALL_KEY!,
      },
    }
  );

  if (!response.ok) {
    throw new Error("API-Football request failed");
  }

  return response.json();
}