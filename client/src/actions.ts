"use server";

import { revalidatePath } from "next/cache";

export interface GetDailyGameResponse {
  all_teams: string[];
  game: {
    day: string;
    team: string;
    year: string;
    state: string;
    position: string;
    game_number: number;
    foundation_year: string;
    top_scorer: {
      name: string;
      goals: string;
    };
    last_league_postion: {
      position: string;
      division: string;
    };
    top_win: {
      against_to: string;
      goals_scored: string;
      goals_conceded: string;
    };
  };
}

export interface GetDailyGameError {
  failed: boolean;
  message: string;
}

/**
 * Revalidate cache if the cached game day is not the current day.
 */
function revalidateCache(result: GetDailyGameResponse) {
  const cachedGameDay = result.game.day.split("/")[0];
  const currentDay = new Date().toLocaleDateString("pt-BR").split("/")[0];

  if (cachedGameDay !== currentDay) {
    revalidatePath("/");
  }
}

export async function getDailyGame(): Promise<
  GetDailyGameResponse | GetDailyGameError
> {
  try {
    const response = await fetch(process.env.DAY_GAME_ENDPOINT || "");

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error);
    }

    const result = await response.json();

    revalidateCache(result);

    return result;
  } catch (error: any) {
    return {
      failed: true,
      message: error.message || "Failed to get daily game",
    };
  }
}

export async function getSpecificDayGame(
  number: string,
): Promise<GetDailyGameResponse | GetDailyGameError> {
  const url = process.env.DAY_GAME_ENDPOINT || "";

  if (!url) {
    console.error("The lambda function URL is empty");
    return {
      failed: true,
      message: "Failed to get daily game",
    };
  }

  try {
    const response = await fetch(`${url}?number=${number}`);

    if (!response.ok) {
      throw new Error(await response.json());
    }

    return response.json();
  } catch (error: any) {
    console.error(`Error on getSpecificDayGame: ${error.message}`);

    return {
      failed: true,
      message: error.message || `Failed to get game #${number}`,
    };
  }
}
