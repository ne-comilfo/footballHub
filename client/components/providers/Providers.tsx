import ThemeProvider from "./ThemeProvider";
import TooltipProvider from "./TooltipProvider";
import QueryProvider from "./TanStackQueryProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
