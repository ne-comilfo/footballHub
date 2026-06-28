import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { NewsArticle } from "@/types/news";

type RelatedNewsProps = {
  articles: NewsArticle[];
};

export default function RelatedNews({ articles }: RelatedNewsProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight">Еще по теме</h2>
      <div className="mt-5 flex flex-col gap-3">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/news/${article.id}`}
            className="group flex flex-col gap-4 rounded-xl border bg-card p-4 transition-shadow hover:shadow-md sm:flex-row sm:items-center"
          >
            <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-lg bg-muted sm:w-48">
              <Image
                src={article.img}
                alt={article.title}
                fill
                sizes="(min-width: 640px) 192px, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">{article.category}</Badge>
                <span className="text-sm text-muted-foreground">
                  {article.date}
                </span>
              </div>
              <h3 className="mt-2 text-lg font-semibold">{article.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                {article.descr}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
