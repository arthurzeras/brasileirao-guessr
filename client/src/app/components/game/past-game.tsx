"use client";

import Game from "./game";
import { useEffect, useState } from "react";
import { getSpecificDayGame, GetDailyGameResponse } from "@/app/actions";

export default function PastGame({ day }: { day: string }) {
  const [dayGame, setDayGame] = useState<GetDailyGameResponse>();

  useEffect(() => {
    getSpecificDayGame(day).then((response) => {
      if ("failed" in response) {
        console.error(response.message);
        return;
      }

      setDayGame(response);
    });
  }, [day]);

  if (!dayGame) {
    return <div className="text-center">Carregando...</div>;
  }

  return <Game dayGame={dayGame} />;
}
