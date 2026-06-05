import { TooltipProvider as NextTooltipProvider } from "@/components/ui/tooltip";

export default function TooltipProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NextTooltipProvider>{children}</NextTooltipProvider>;
}
