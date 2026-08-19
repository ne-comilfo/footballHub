import type { User } from "@football-hub/contracts";

import ThemeProvider from "./ThemeProvider";
import TooltipProvider from "./TooltipProvider";
import QueryProvider from "./TanStackQueryProvider";

export default function Providers({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: User | null;
}) {
  return (
    <ThemeProvider>
      <QueryProvider initialUser={initialUser}>
        <TooltipProvider>{children}</TooltipProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
