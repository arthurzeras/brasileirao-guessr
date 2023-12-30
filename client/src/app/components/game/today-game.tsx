"use client";

import Game from "./game";
import { useEffect, useState } from "react";
import { getDailyGame, GetDailyGameResponse } from "@/app/actions";

export default function TodayGame() {
  const [dailyGame, setDailyGame] = useState<GetDailyGameResponse>();

  useEffect(() => {
    getDailyGame().then((response) => {
      if ("failed" in response) {
        console.error(response.message);
        return;
      }

      setDailyGame(response);
    });
  }, []);

  if (!dailyGame) {
    return <div className="text-center">Carregando...</div>;
  }

  return <Game dayGame={dailyGame} />;
}
