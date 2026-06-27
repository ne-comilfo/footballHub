export async function theSportsDbFetch(endpoint: string) {
  const response = await fetch(
    `${process.env.THE_SPORTS_DB_BASE_URL}${endpoint}`,
  );
  
  if (!response.ok) {
    throw new Error("The Sports DB request failed");
  }

  return response.json();
}
