"use client";

import Game from "./game";
import { useEffect, useState } from "react";
import { getSpecificDayGame, GetDailyGameResponse } from "@/app/actions";

export default function PastGame({ number }: { number: string }) {
  const [dayGame, setDayGame] = useState<GetDailyGameResponse>();

  useEffect(() => {
    getSpecificDayGame(number).then((response) => {
      if ("failed" in response) {
        console.error(response.message);
        return;
      }

      setDayGame(response);
    });
  }, [number]);

  if (!dayGame) {
    return <div className="text-center">Carregando...</div>;
  }

  return <Game dayGame={dayGame} />;
}
