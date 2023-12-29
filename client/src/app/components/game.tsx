"use client";

import TipCard from "./tip-card";
import GameEnd from "./game-end";
import XMarkIcon from "./icons/x-mark";
import AnswerForm from "./answer-form";
import { useEffect, useState } from "react";
import { getDailyGame, GetDailyGameResponse } from "../actions";

const TOTAL_ATTEMPTS = 5;

export default function Game() {
  const [gameWin, setGameWin] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [dailyGame, setDailyGame] = useState<GetDailyGameResponse>();
  const [teamsAttempted, setTeamsAttempted] = useState<string[]>([]);
  const [remainingAttempts, setRemainingAttempts] = useState(TOTAL_ATTEMPTS);

  useEffect(() => {
    getDailyGame().then((response) => {
      if ("failed" in response) {
        console.error(response.message);
        return;
      }

      setDailyGame(response);
    });
  }, []);

  function checkAnswer(answer: string) {
    if (answer === dailyGame?.game?.team) {
      setGameWin(true);
      return;
    }

    setRemainingAttempts(remainingAttempts - 1);
    setTeamsAttempted([...teamsAttempted, answer]);

    if (remainingAttempts === 0) {
      setGameOver(true);
    }
  }

  function renderTips() {
    const _remainingAttempts = remainingAttempts < 0 ? 0 : remainingAttempts;
    const arrayLength = TOTAL_ATTEMPTS - _remainingAttempts;

    if (arrayLength === 0) {
      return;
    }

    const tipsList = () => {
      return Array.from({ length: arrayLength }).map((_, index) => (
        <TipCard key={index} tipNumber={index + 1} dailyGame={dailyGame} />
      ));
    };

    return <div className="flex flex-col mb-3 gap-2">{tipsList()}</div>;
  }

  function remainingAttemptsLabel() {
    if (remainingAttempts < 0) {
      return;
    }

    if (remainingAttempts === 0) {
      return "Última tentativa!";
    }

    return `${remainingAttempts + 1} tentativas restantes`;
  }

  function renderTeamsAttempted() {
    return teamsAttempted.map((team, index) => (
      <div
        key={index}
        className="flex items-center bg-red-100 border border-red-700 rounded-md px-2 py-1.5 shadow-sm"
      >
        <XMarkIcon className="h-8 w-8 text-red-600" />
        <span>
          {index + 1}º tentativa: <strong>{team}</strong>
        </span>
      </div>
    ));
  }

  function renderGame() {
    if (gameOver) {
      return <GameEnd answer={dailyGame?.game.team || ""} correct={false} />;
    }

    if (gameWin) {
      return <GameEnd answer={dailyGame?.game.team || ""} correct={true} />;
    }

    return (
      <>
        {renderTips()}
        <div className="text-center mb-3 text-sm">
          {remainingAttemptsLabel()}
        </div>
        <AnswerForm answerReceived={checkAnswer} />
        <div className="mt-3 flex flex-col gap-2">{renderTeamsAttempted()}</div>
      </>
    );
  }

  return <section>{renderGame()}</section>;
}
