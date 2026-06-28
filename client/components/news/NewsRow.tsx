import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { NewsArticle } from "@/types/news";

type NewsRowProps = {
  article: NewsArticle;
};

export default function NewsRow({ article }: NewsRowProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:shadow-lg md:flex-row">
      <Link
        href={`/news/${article.id}`}
        className="relative min-h-56 w-full shrink-0 overflow-hidden bg-muted md:w-80"
      >
        <Image
          src={article.img}
          alt={article.title}
          fill
          sizes="(min-width: 768px) 320px, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-5 p-5 sm:p-6">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{article.category}</Badge>
            <span className="text-sm text-muted-foreground">
              {article.date}
            </span>
            <span className="text-sm text-muted-foreground">
              · {article.readTime}
            </span>
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight">
            {article.title}
          </h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            {article.descr}
          </p>
        </div>

        <Link
          href={`/news/${article.id}`}
          className={buttonVariants({
            variant: "outline",
            size: "lg",
            className: "w-fit rounded-xl",
          })}
        >
          Читать материал
        </Link>
      </div>
    </article>
  );
}
