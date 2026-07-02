import { NextResponse } from "next/server";
import { theSportsDbFetch } from "@/lib/theSportsDb";

export async function GET() {
  const today = new Date();
  const yesterday = new Date();

  yesterday.setDate(today.getDate() - 1);

  const formatter = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Moscow",
  });

  const todayStr = formatter.format(today);
  const yesterdayStr = formatter.format(yesterday);

  const days = [todayStr, yesterdayStr];


  const results = await Promise.all(
    days.map(async (date) => {
      const data = await theSportsDbFetch(
        `/123/eventsday.php?d=${date}&s=Soccer&l=4429`,
      );

      const dataLatest = data.events.filter(
        (event: any) => event.strStatus === "FT" || event.strStatus === 'AET',
      );

      const dataNearest = data.events.filter(
        (event: any) => event.strStatus !== "FT" &&  event.strStatus !== 'AET',
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
