import Link from "next/link";

export default function BurgerMenu({
  open,
  setIsMenuOpen,
}: {
  open: boolean;
  setIsMenuOpen: (value: boolean) => void;
}) {
  const links = [
    { href: "/teams", label: "Команды" },
    { href: "/players", label: "Игроки" },
    { href: "/news", label: "Новости" },
    { href: "/about", label: "Обо мне" },
  ];
  return (
    <aside
      className={`
        fixed left-0 top-16 z-40
        h-[calc(100dvh-3rem)]
        w-full
        border-r
        bg-background
        transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <nav className="flex flex-col p-4">
        {links.map((link) => (
          <Link
            onClick={() => setIsMenuOpen(false)}
            key={link.href}
            href={link.href}
            className="
              rounded-lg
              px-4
              py-3
              text-lg
              hover:bg-accent
            "
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
