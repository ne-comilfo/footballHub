import Image from "next/image";
import Link from "next/link";

import RelatedNews from "@/components/news/RelatedNews";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { latestNews } from "@/data/news";

type NewsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function NewsPage({ params }: NewsPageProps) {
  const { id } = await params;
  const article =
    latestNews.find((item) => item.id === Number(id)) ?? latestNews[0];
  const relatedArticles = latestNews
    .filter((item) => item.id !== article.id)
    .slice(0, 3);

  return (
    <div className="mx-auto mb-8 flex w-full max-w-5xl flex-col gap-8 px-4 sm:px-6">
      <article className="flex flex-col gap-8">
        <header className="flex flex-col items-start gap-5 rounded-xl border bg-card p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{article.category}</Badge>
            <span className="text-sm text-muted-foreground">{article.date}</span>
            <span className="text-sm text-muted-foreground">
              · {article.readTime}
            </span>
          </div>

          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
            {article.title}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
            {article.descr}
          </p>
          <p className="text-sm font-medium">{article.author}</p>
        </header>

        <div className="relative aspect-[16/7] min-h-64 overflow-hidden rounded-xl border bg-muted">
          <Image
            src={article.img}
            alt={article.title}
            fill
            priority
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 text-lg text-justify">
          {article.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>

      <Separator />
      <RelatedNews articles={relatedArticles} />

      <nav className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/news"
          className={buttonVariants({
            variant: "outline",
            size: "lg",
            className: "rounded-xl",
          })}
        >
          Назад к новостям
        </Link>
        <Link
          href="/"
          className={buttonVariants({ size: "lg", className: "rounded-xl" })}
        >
          На главную
        </Link>
      </nav>
    </div>
  );
}
