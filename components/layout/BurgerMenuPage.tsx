import { useState } from "react";
import BurgerMenu from "./BurgerMenu";

export default function BurgerMenuPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        type="button"
        className="relative flex size-8 items-center justify-center rounded-md border border-border"
      >
        <span
          className={`
            absolute h-0.5 w-4 bg-foreground
            transition-all duration-300
            ${isMenuOpen ? "rotate-45" : "-translate-y-1.5"}
          `}
        />

        <span
          className={`
            absolute h-0.5 w-4 bg-foreground
            transition-all duration-300
            ${isMenuOpen ? "opacity-0" : "opacity-100"}
          `}
        ></span>

        <span
          className={`
            absolute h-0.5 w-4 bg-foreground
            transition-all duration-300
            ${isMenuOpen ? "-rotate-45" : "translate-y-1.5"}
          `}
        />
      </button>

      <BurgerMenu open={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </>
  );
}
