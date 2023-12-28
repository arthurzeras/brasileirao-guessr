"use server";

export interface GetDailyGameResponse {
  all_teams: string[];
  game: {
    day: string;
    team: string;
    year: string;
    state: string;
    position: string;
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

export async function getDailyGame(): Promise<
  GetDailyGameResponse | GetDailyGameError
> {
  const response = await fetch(process.env.DAY_GAME_ENDPOINT || "", {
    cache: "no-cache",
  });

  if (!response.ok) {
    const error = await response.json();
    return {
      failed: true,
      message: error.message || "Failed to get content from Google Sheets",
    };
  }

  return response.json();
}
