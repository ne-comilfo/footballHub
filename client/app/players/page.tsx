import type { Metadata } from "next";
import PlayersPage from "./PlayersPage";

export const metadata: Metadata = {
  title: "Игроки",
  description:
    "Каталог футболистов: клуб, позиция, возраст и статистика по сезонам.",
};

export default function Page() {
  return <PlayersPage />;
}
