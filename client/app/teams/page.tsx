import type { Metadata } from "next";
import TeamsPage from "./TeamsPage";

export const metadata: Metadata = {
  title: "Команды",
  description:
    "Каталог футбольных клубов: состав, статистика, последние результаты.",
};

export default function Page() {
  return <TeamsPage />;
}
