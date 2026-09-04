"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import type { SupportedFavoriteKind } from "@football-hub/contracts";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMe } from "@/hooks/useAuth";
import { useIsFavorite, useToggleFavorite } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

type FavoriteButtonProps = {
  kind: SupportedFavoriteKind;
  entityId: string;
  className?: string;
};

export default function FavoriteButton({
  kind,
  entityId,
  className,
}: FavoriteButtonProps) {
  const { data: user } = useMe();
  const isFavorite = useIsFavorite(kind, entityId);
  const toggle = useToggleFavorite(kind, entityId);
  const [askToLogin, setAskToLogin] = useState(false);

  const label = isFavorite ? "Убрать из избранного" : "Добавить в избранное";

  function handleClick(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (!user) {
      setAskToLogin(true);
      return;
    }

    toggle.mutate();
  }

  return (
    <>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label={label}
              aria-pressed={isFavorite}
              disabled={toggle.isPending}
              onClick={handleClick}
              className={cn(
                "rounded-full bg-background/90 backdrop-blur-sm",
                className,
              )}
            >
              <Heart
                className={cn(
                  "size-4 transition-colors",
                  isFavorite && "fill-red-500 text-red-500",
                )}
              />
            </Button>
          }
        />
        <TooltipContent side="left">{label}</TooltipContent>
      </Tooltip>

      <Dialog open={askToLogin} onOpenChange={setAskToLogin}>
        <DialogContent>
          <DialogTitle>Нужен аккаунт</DialogTitle>

          <DialogDescription>
            Избранное доступно зарегистрированным пользователям. Войдите или
            создайте аккаунт, чтобы сохранять команды и игроков.
          </DialogDescription>

          <DialogFooter>
            <DialogClose
              render={
                <Button type="button" variant="outline" size="lg">
                  Отмена
                </Button>
              }
            />

            <Link
              href="/auth"
              className={buttonVariants({ size: "lg" })}
            >
              Войти
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
