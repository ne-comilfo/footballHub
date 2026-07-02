export async function getPlayerInfo(id: string) {
  const response = await fetch(
    `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch player");
  }

  const data = await response.json();

  return data.players[0];
}

export async function getPopularPlayers() {
  const ids = [
    "34146371",
    "34146370",
    "34146304",
    "34162098",
    "34146220",
    "34146681",
  ];

  return Promise.all(ids.map((id) => getPlayerInfo(id)));
}

export async function getPLayerInfoApiFootball(id: string) {
  const response = await fetch(`/api/players/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch player");
  }

  const data = await response.json();
  if (!data.response.length) return null;
  

  return data.response[0];
}
