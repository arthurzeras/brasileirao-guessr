"use client";
import { useEffect, useState } from "react";

import Game from "./game";
import { getDailyGame, GetDailyGameResponse } from "@/actions";

export default function TodayGame() {
  const [dailyGame, setDailyGame] = useState<GetDailyGameResponse>();

  useEffect(() => {
    getDailyGame().then((response) => {
      if (!response || "failed" in response) {
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
