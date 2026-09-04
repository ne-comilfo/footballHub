import { serverEnv } from "@/lib/env";
import type { FootballDataProvider } from "./provider";
import { externalProvider } from "./external";
import { ownProvider } from "./own";

export function getProvider(): FootballDataProvider {
  if (serverEnv.dataSource !== "own") {
    return externalProvider;
  }

  return {
    ...ownProvider,
    getMatchOfTheDay: externalProvider.getMatchOfTheDay,
    getMatchesBoard: externalProvider.getMatchesBoard,
  };
}

export type { FootballDataProvider };
