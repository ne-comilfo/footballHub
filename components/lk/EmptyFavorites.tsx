import { ReactNode } from "react";

interface EmptyFavoritesProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function EmptyFavorites({
  icon,
  title,
  description,
}: EmptyFavoritesProps) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed bg-card p-6 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        {icon}
      </div>

      <h3 className="mt-4 text-lg font-semibold">{title}</h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}