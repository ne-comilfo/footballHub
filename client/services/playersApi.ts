import { DEFAULT_PLAYER_FILTERS } from "@/data/player-filters";
import {
  PlayerFilters,
  PlayerListItem,
  PlayersListResponse,
  SportsDbPlayer,
} from "@/types/player";

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

function getAge(dateBorn: string | null) {
  if (!dateBorn) {
    return null;
  }

  const birthDate = new Date(dateBorn);

  if (Number.isNaN(birthDate.getTime())) {
    return null;
  }

  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const hasBirthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  return hasBirthdayPassed ? age : age - 1;
}

function normalizePlayer(player: SportsDbPlayer): PlayerListItem {
  const age = getAge(player.dateBorn);

  return {
    idAPIfootball: player.idAPIfootball,
    name: player.strPlayer,
    image:
      player.strCutout ??
      player.strThumb ??
      "https://www.thesportsdb.com/images/media/player/thumb/ywruys1473507097.jpg",
    country: player.strNationality ?? "Unknown",
    position: player.strPosition ?? "Unknown",
    number: player.strNumber,
    club: player.strTeam,
    teamId: player.idTeam,
    age,
    stats: [
      { label: "Клуб", value: player.strTeam },
      { label: "Страна", value: player.strNationality ?? "-" },
      { label: "Возраст", value: age ?? "-" },
    ],
  };
}

export async function getAllPlayers(
  filters: Partial<PlayerFilters>,
): Promise<PlayersListResponse> {
  const response = await fetch("/api/players/all");

  if (!response.ok) {
    throw new Error("Failed to fetch players");
  }

  const data = (await response.json()) as { players?: SportsDbPlayer[] };
  const search = filters.search?.trim().toLowerCase() ?? "";
  const country = filters.country ?? DEFAULT_PLAYER_FILTERS.country;
  const position = filters.position ?? DEFAULT_PLAYER_FILTERS.position;
  const club = filters.club ?? DEFAULT_PLAYER_FILTERS.club;

  const filteredPlayers = (data.players ?? [])
    .map(normalizePlayer)
    .filter((player) => {
      const matchesSearch =
        !search || player.name.toLowerCase().includes(search);
      const matchesCountry =
        country === DEFAULT_PLAYER_FILTERS.country ||
        player.country === country;
      const matchesPosition =
        position === DEFAULT_PLAYER_FILTERS.position ||
        player.position === position;
      const matchesClub =
        club === DEFAULT_PLAYER_FILTERS.club || player.club === club;

      return matchesSearch && matchesCountry && matchesPosition && matchesClub;
    })
    .sort((playerA, playerB) => {
      switch (filters.sort) {
        case "По имени ↑":
          return playerA.name.localeCompare(playerB.name);
        case "По возрасту ↓":
          return (playerB.age ?? 0) - (playerA.age ?? 0);
        case "По возрасту ↑":
          return (playerA.age ?? 0) - (playerB.age ?? 0);
        case "По клубу ↓":
          return playerB.club.localeCompare(playerA.club);
        case "По клубу ↑":
          return playerA.club.localeCompare(playerB.club);
        default:
          return playerB.name.localeCompare(playerA.name);
      }
    });

  const limit = Math.max(Number(filters.limit) || 9, 1);
  const page = Math.max(Number(filters.page) || 1, 1);
  const totalPages = Math.max(Math.ceil(filteredPlayers.length / limit), 1);
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * limit;

  return {
    items: filteredPlayers.slice(startIndex, startIndex + limit),
    totalItems: filteredPlayers.length,
    totalPages,
  };
}
