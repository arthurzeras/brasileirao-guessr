"use client";

import EventBus from "@/app/bus";
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
      className="submit-button"
    >
      ENVIAR
    </button>
  );
}

export default function AnswerForm({ answerReceived }: AnswerFormProps) {
  const [teamSelected, setTeamSelected] = useState("");

  const submitHandler = () => {
    answerReceived(teamSelected);
    EventBus.$emit("ANSWER_SUBMITTED", { team: teamSelected });
  };

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <SearchInput teamChanged={setTeamSelected} />
      <SubmitButton disabled={!teamSelected} onClick={submitHandler} />
    </form>
  );
}
