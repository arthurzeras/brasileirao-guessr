import { useEffect, useState } from "react";
import { ValuesInStorage, storage } from "../storage";

interface AnswerToSaveParams {
  gameWin?: boolean;
  gameOver?: boolean;
  teamsAttempted?: string[];
  remainingAttempts?: number;
}

export default function useStorage(gameDate: string) {
  const [answerToSave, setAnswerToSave] = useState<AnswerToSaveParams>();

  useEffect(() => {
    if (answerToSave) {
      storage.saveAnswer({
        day: gameDate,
        gameWin: answerToSave?.gameWin || false,
        gameOver: answerToSave?.gameOver || false,
        teamsAttempted: answerToSave?.teamsAttempted || [],
        remainingAttempts: answerToSave?.remainingAttempts || 5,
      });
    }
  }, [answerToSave, gameDate]);

  function saveAnswerInStorage(newValue: AnswerToSaveParams) {
    setAnswerToSave({ ...answerToSave, ...newValue });
  }

  function getStorageValuesToSetState(
    callback: (values: ValuesInStorage | Record<string, any>) => void,
  ) {
    const storageValues = storage.getDay(gameDate);
    return callback(storageValues || {});
  }

  return { saveAnswerInStorage, getStorageValuesToSetState };
}
