export async function getLastResults() {
  const response = await fetch("/api/lastResults");

  if (!response.ok) {
    throw new Error("Failed to fetch matches");
  }

  return response.json();
}