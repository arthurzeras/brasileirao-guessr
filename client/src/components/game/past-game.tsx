"use client";
import { useEffect, useState } from "react";

import Game from "./game";
import { getSpecificDayGame, GetDailyGameResponse } from "@/actions";

export default function PastGame({ number }: { number: string }) {
  const [error, setError] = useState(false);
  const [dayGame, setDayGame] = useState<GetDailyGameResponse>();

  useEffect(() => {
    getSpecificDayGame(number).then((response) => {
      if (!response || "failed" in response) {
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
