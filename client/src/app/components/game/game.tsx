import TipCard from "./tip-card";
import GameEnd from "./game-end";
import AnswerForm from "./answer-form";
import XMarkIcon from "../icons/x-mark";
import ShareButton from "./share-button";
import { useEffect, useState } from "react";
import useStorage from "@/app/hooks/use-storage";
import { GetDailyGameResponse } from "@/app/actions";

const TOTAL_ATTEMPTS = 5;

interface GameProps {
  dayGame: GetDailyGameResponse;
}

export default function Game({ dayGame }: GameProps) {
  const [gameWin, setGameWin] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [teamsAttempted, setTeamsAttempted] = useState<string[]>([]);
  const [remainingAttempts, setRemainingAttempts] = useState(TOTAL_ATTEMPTS);

  const { saveAnswerInStorage, getStorageValuesToSetState } = useStorage(
    dayGame.game.day,
  );

  useEffect(() => {
    getStorageValuesToSetState((values) => {
      setGameWin(values.gameWin || false);
      setGameOver(values.gameOver || false);
      setTeamsAttempted(values.teamsAttempted || []);
      setRemainingAttempts(values.remainingAttempts || TOTAL_ATTEMPTS);
    });
  }, []); /* eslint-disable-line */

  function checkAnswer(answer: string) {
    if (answer === dayGame.game.team) {
      setGameWin(true);
      saveAnswerInStorage({ gameWin: true });
      return;
    }

    setGameOver(remainingAttempts === 0);
    setRemainingAttempts(remainingAttempts - 1);
    setTeamsAttempted([...teamsAttempted, answer]);

    saveAnswerInStorage({
      gameOver: remainingAttempts === 0,
      remainingAttempts: remainingAttempts - 1,
      teamsAttempted: [...teamsAttempted, answer],
    });
  }

  function renderTips() {
    const _remainingAttempts = remainingAttempts < 0 ? 0 : remainingAttempts;
    const arrayLength = TOTAL_ATTEMPTS - _remainingAttempts;

    if (arrayLength === 0) {
      return;
    }

    const tipsList = () => {
      return Array.from({ length: arrayLength }).map((_, index) => (
        <TipCard key={index} tipNumber={index + 1} dailyGame={dayGame} />
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

  function getScore(
    defaultString: string,
    winString: string,
    loseString: string,
  ) {
    const winInAttempts = TOTAL_ATTEMPTS - remainingAttempts;
    const blocks = Array.from<string>({ length: TOTAL_ATTEMPTS + 1 }).fill(
      defaultString,
    );

    if (gameWin) {
      blocks[winInAttempts] = winString;
    }

    for (let i = 0; i < winInAttempts; i++) {
      blocks[i] = loseString;
    }

    return blocks;
  }

  function renderShareButton() {
    if (gameOver || gameWin) {
      const score = getScore("⬛", "🟩", "🟥");
      return (
        <ShareButton score={score} gameNumber={dayGame.game.game_number} />
      );
    }

    return null;
  }

  function renderScore() {
    if (gameOver || gameWin) {
      const score = getScore("slate", "green", "red");
      const listToRender = score.map((color, index) => {
        const colorMap: Record<string, string[]> = {
          red: ["text-red-600", "bg-red-300", "border-red-300"],
          slate: ["text-slate-600", "bg-slate-300", "border-slate-300"],
          green: ["text-green-600", "bg-green-300", "border-green-300"],
        };

        const colorClasses = colorMap[color].join(" ");

        return (
          <span
            key={index}
            className={`${colorClasses} text-lg rounded-md border px-2`}
          >
            {index + 1}
          </span>
        );
      });

      return (
        <div className="flex mt-2 gap-2 justify-center">{listToRender}</div>
      );
    }

    return null;
  }

  function renderGame() {
    if (gameOver) {
      return <GameEnd answer={dayGame.game.team || ""} correct={false} />;
    }

    if (gameWin) {
      return <GameEnd answer={dayGame.game.team || ""} correct={true} />;
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

  return (
    <section>
      <>{renderGame()}</>
      <>{renderScore()}</>
      <>{renderShareButton()}</>
    </section>
  );
}
