import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { NewsArticle } from "@/types/news";

type FeaturedNewsProps = {
  article: NewsArticle;
};

export default function FeaturedNews({ article }: FeaturedNewsProps) {
  return (
    <article className="group overflow-hidden rounded-xl border bg-card">
      <Link
        href={`/news/${article.id}`}
        className="relative block aspect-[16/7] min-h-64 overflow-hidden bg-muted"
      >
        <Image
          src={article.img}
          alt={article.title}
          fill
          priority
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </Link>

      <div className="flex flex-col items-start gap-4 p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>Главное</Badge>
          <Badge variant="outline">{article.category}</Badge>
          <span className="text-sm text-muted-foreground">{article.date}</span>
        </div>
        <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
          {article.title}
        </h2>
        <p className="max-w-3xl text-base leading-7 text-muted-foreground">
          {article.descr}
        </p>
        <Link
          href={`/news/${article.id}`}
          className={buttonVariants({ size: "lg", className: "rounded-xl" })}
        >
          Открыть новость
        </Link>
      </div>
    </article>
  );
}
