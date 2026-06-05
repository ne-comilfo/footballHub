import ThemeProvider from "./ThemeProvider";
import TooltipProvider from "./TooltipProvider";

export default function Prodivers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  );
}
