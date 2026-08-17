import { serverEnv } from "@/lib/env";
import type { FootballDataProvider } from "./provider";
import { externalProvider } from "./external";
import { ownProvider } from "./own";

export function getProvider(): FootballDataProvider {
  return serverEnv.dataSource === "own" ? ownProvider : externalProvider;
}

export type { FootballDataProvider };
