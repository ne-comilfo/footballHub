import Image from "next/image";

import { TeamNews as TeamNewsItem } from "@/types/team";

import SectionTitle from "./SectionTitle";

type TeamNewsProps = {
  news: TeamNewsItem[];
};

export default function TeamNews({ news }: TeamNewsProps) {
  return (
    <section className="space-y-4">
      <SectionTitle>Последние новости команды</SectionTitle>
      <div className="grid gap-4 lg:grid-cols-3">
        {news.map((item) => (
          <article
            key={item.title}
            className="overflow-hidden rounded-xl border bg-card"
          >
            <div className="relative h-44">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="line-clamp-2 text-lg font-semibold">
                {item.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
