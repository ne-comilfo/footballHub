import "@/app/globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Prodivers from "@/components/providers/Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={cn("h-full", "antialiased")}
    >
      <body className="min-h-full flex flex-col">
        <Prodivers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Prodivers>
      </body>
    </html>
  );
}
