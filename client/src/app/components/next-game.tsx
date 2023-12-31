"use client";

import { useEffect, useState } from "react";

let interval: NodeJS.Timeout | null = null;

const MIN_IN_MS = 1000 * 60;
const HOURS_IN_MS = 1000 * 60 * 60;

function padZero(num: number) {
  return Math.floor(num).toString().padStart(2, "0");
}

export default function NextGame() {
  const [timeString, setTimeString] = useState("");

  const now = new Date();
  const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const nextGameTime = next.getTime() - now.getTime();
  const nextGameHours = padZero(nextGameTime / HOURS_IN_MS);
  const nextGameMinutes = padZero((nextGameTime % HOURS_IN_MS) / MIN_IN_MS);
  const nextGameSeconds = padZero((nextGameTime % MIN_IN_MS) / 1000);

  useEffect(() => {
    if (interval) {
      clearInterval(interval);
    }

    interval = setInterval(() => {
      const label = `${nextGameHours}h ${nextGameMinutes}m ${nextGameSeconds}s`;
      if (label === "00h 00m 00s") {
        window.location.reload();
        return;
      }

      setTimeString(label);
    }, 1000);
  });

  if (!timeString) {
    return null;
  }

  return (
    <div className="text-lg text-center mt-2">
      Próximo jogo em: {timeString}
    </div>
  );
}
