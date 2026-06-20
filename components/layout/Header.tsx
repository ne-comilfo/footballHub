"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar, AvatarBadge, AvatarFallback } from "@/components/ui/avatar";
import ThemeToggle from "../providers/ThemeToggle";

export default function Header() {
  const pathname = usePathname();
  const isProfilePage = pathname.startsWith("/lk");
  const links = [
    { href: "/", label: "Football Hub" },
    { href: "/teams", label: "Команды" },
    { href: "/players", label: "Игроки" },
    { href: "/news", label: "Новости" },
    { href: "/about", label: "Обо мне" },
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 bg-background/50 backdrop-blur-md">
      <div className="h-16 flex items-center justify-between px-6 border-b text-xl">
        <nav className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === link.href
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex gap-10 items-center">
          <Tooltip>
            <TooltipTrigger render={<ThemeToggle />}></TooltipTrigger>

            <TooltipContent side="left">Сменить тему</TooltipContent>
          </Tooltip>
          {isProfilePage ? (
            <Tooltip>
              <TooltipTrigger
                render={
                  <Link href="/lk" aria-label="Личный кабинет">
                    <Avatar size="lg">
                      <AvatarFallback className="font-semibold">ГМ</AvatarFallback>
                      <AvatarBadge className="bg-emerald-500" />
                    </Avatar>
                  </Link>
                }
              />
              <TooltipContent side="left">Личный кабинет</TooltipContent>
            </Tooltip>
          ) : (
            <Link href="/auth">Войти</Link>
          )}
        </div>
      </div>
    </header>
  );
}
