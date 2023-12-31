"use client";

import Game from "./game";
import { useEffect, useState } from "react";
import { getSpecificDayGame, GetDailyGameResponse } from "@/app/actions";

export default function PastGame({ number }: { number: string }) {
  const [error, setError] = useState(false);
  const [dayGame, setDayGame] = useState<GetDailyGameResponse>();

  useEffect(() => {
    getSpecificDayGame(number).then((response) => {
      if ("failed" in response) {
        setError(true);
        return;
      }

      setDayGame(response);
    });
  }, [number]);

  if (error) {
    return null;
  }

  if (!dayGame) {
    return;
  }

  return <Game dayGame={dayGame} />;
}
