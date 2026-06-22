export async function getTeamInfo(id: string) {
  const response = await fetch(`api/teams/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch team");
  }

  const data = await response.json();

  return data.teams[0];
}

export async function getPopularTeams() {
    const ids = ["133739", "133738", "133664", "133714", "134125", "133613"];

    return Promise.all(ids.map(id => getTeamInfo(id)))
}