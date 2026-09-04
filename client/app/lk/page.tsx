import type { Metadata } from "next";
import ProfilePage from "./ProfilePage";

export const metadata: Metadata = {
  title: "Личный кабинет",
};

export default function Page() {
  return <ProfilePage />;
}
