import "@/app/globals.css";
import { cookies } from "next/headers";

import { cn } from "@/lib/utils";
import { ACCESS_COOKIE } from "@/lib/auth/constants";
import { readAccessToken } from "@/lib/auth/token";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/providers/Providers";

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
