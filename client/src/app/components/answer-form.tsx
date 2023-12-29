"use client";

import EventBus from "../bus";
import { useState } from "react";
import SearchInput from "./search-input";

interface AnswerFormProps {
  answerReceived: (team: string) => void;
}

interface SubmitButtonProps {
  disabled: boolean;
  onClick: () => void;
}

function SubmitButton({ disabled, onClick }: SubmitButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-full mt-2 text-center bg-green-500 border-green-600 disabled:bg-green-200 disabled:border-green-300 disabled:cursor-not-allowed hover:bg-green-700 border h-12 px-4 rounded-md shadow-sm font-medium"
    >
      ENVIAR
    </button>
  );
}

export default function AnswerForm({ answerReceived }: AnswerFormProps) {
  const [teamSelected, setTeamSelected] = useState("");

  const submitHandler = () => {
    answerReceived(teamSelected);
    EventBus.$emit("ANSWER_SUBMITED", { team: teamSelected });
  };

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <SearchInput teamChanged={setTeamSelected} />
      <SubmitButton disabled={!teamSelected} onClick={submitHandler} />
    </form>
  );
}
