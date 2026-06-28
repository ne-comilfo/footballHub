import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function PlayerNavigation() {
  return (
    <nav className="flex flex-col gap-3 sm:flex-row">
      <Link
        href="/players"
        className={buttonVariants({ variant: "outline", size: "lg", className: "rounded-xl" })}
      >
        Назад к игрокам
      </Link>
      <Link
        href="/teams"
        className={buttonVariants({ size: "lg", className: "rounded-xl" })}
      >
        Смотреть команды
      </Link>
    </nav>
  );
}
