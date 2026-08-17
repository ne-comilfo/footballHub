import Image from "next/image";
import Link from "next/link";

import { News } from "@/types/main-page";
import { latestNews } from "@/data/news";

const inProgress = true;

function NewCard({ id, img, descr, title }: News) {
  return (
    <Link
      href={`/news/${id}`}
      className="flex gap-4 rounded-xl border p-4 transition-all duration-300 hover:shadow-md"
    >
      <div className="relative h-24 w-36 shrink-0 overflow-hidden rounded-lg">
        <Image src={img} alt={title} fill className="object-cover" />
      </div>

      <div className="flex min-w-0 flex-col">
        <h3 className="line-clamp-2 text-lg font-semibold">{title}</h3>

        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
          {descr}
        </p>
      </div>
    </Link>
  );
}

export default function LatestNews() {
  return (
    <div className="flex flex-col items-center mb-5 mx-1">
      <h2
        id="latest-news"
        className="mb-5 scroll-mt-16 text-center text-3xl font-bold"
      >
        Последние новости
      </h2>
      {inProgress ? (
        <></>
      ) : (
        <div className="grid w-full  grid-cols-1 gap-4">
          {latestNews.map((item) => (
            <NewCard key={item.id} {...item} />
          ))}
          <Link
            href="/news"
            className="rounded-xl border p-4 text-center font-medium"
          >
            Новости →
          </Link>
        </div>
      )}
    </div>
  );
}
