import { NextResponse } from "next/server";
import { theSportsDbFetch } from "@/lib/theSportsDb";

export async function GET() {
  const today = new Date();
  const yesterday = new Date();

  yesterday.setDate(today.getDate() - 1);

  const todayStr = today.toLocaleDateString('ru-RU');
  const yesterdayStr = yesterday.toLocaleDateString('ru-RU');
  console.log(today, yesterday)

  const days = [todayStr, yesterdayStr];

  const results = await Promise.all(
    days.map(async (date) => {
      const data = await theSportsDbFetch(
        `/123/eventsday.php?d=${date}&s=Soccer`,
      );

      const dataLatest = data.events.filter(
        (event: any) => event.strStatus === "FT",
      );
      // console.log(data.events);
      const dataNearest = data.events.filter(
        (event: any) => event.strStatus !== "FT",
      );

      return {
        dataLatest,
        dataNearest,
      };
    }),
  );

  const latest = results
    .flatMap((item) => item.dataLatest)
    .sort(
      (a, b) =>
        new Date(b.strTimestamp).getTime() - new Date(a.strTimestamp).getTime(),
    );

  const nearest = results
    .flatMap((item) => item.dataNearest)
    .sort(
      (a, b) =>
        new Date(a.strTimestamp).getTime() - new Date(b.strTimestamp).getTime(),
    );
  return NextResponse.json({
    latest: latest.slice(0, 5),
    nearest: nearest.slice(0, 5),
  });
}
