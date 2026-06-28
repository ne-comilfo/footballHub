import FeaturedNews from "@/components/news/FeaturedNews";
import NewsFilters from "@/components/news/NewsFilters";
import NewsRow from "@/components/news/NewsRow";
import { latestNews } from "@/data/news";

export default function FootballNews() {
  const [featuredArticle, ...articles] = latestNews;

  return (
    <div className="mx-auto mb-8 mt-2 flex w-full max-w-5xl flex-col gap-8 px-4 sm:px-6">
      <section className="rounded-xl border bg-card p-6 sm:p-8">
        <p className="text-sm font-medium uppercase text-muted-foreground">
          Football Hub
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          Новости
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Главные события футбольного дня: клубы, трансферы, контракты и
          подготовка команд к новому сезону.
        </p>
      </section>

      <NewsFilters />
      <FeaturedNews article={featuredArticle} />

      <section>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Свежая лента</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight">
              Последние материалы
            </h2>
          </div>
          <span className="text-sm text-muted-foreground">
            {latestNews.length} новостей
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {articles.map((article) => (
            <NewsRow key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
