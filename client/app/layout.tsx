import "@/app/globals.css";
import type { Metadata } from "next";
import { cookies } from "next/headers";

import { cn } from "@/lib/utils";
import { ACCESS_COOKIE } from "@/lib/auth/constants";
import { readAccessToken } from "@/lib/auth/token";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/providers/Providers";

export const metadata: Metadata = {
  title: {
    default: "Football Hub — футбольный портал",
    template: "%s · Football Hub",
  },
  description:
    "Команды, игроки, матчи и статистика европейского футбола на русском языке.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = await cookies();
  const user = await readAccessToken(store.get(ACCESS_COOKIE)?.value);

  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={cn("h-full", "antialiased")}
    >
      <body className="min-h-full flex flex-col">
        <Providers initialUser={user}>
          <Header />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
