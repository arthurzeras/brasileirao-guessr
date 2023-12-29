"use client";

import EventBus from "../bus";
import SearchInput from "./search-input";
import { FormEvent, useRef } from "react";

interface AnswerFormProps {
  answerReceived: (team: string) => void;
}

function SubmitButton() {
  return (
    <button
      type="submit"
      className="w-full mt-2 text-center bg-green-500 border-green-600 border h-12 px-4 rounded-md shadow-sm font-medium"
    >
      ENVIAR
    </button>
  );
}

export default function AnswerForm({ answerReceived }: AnswerFormProps) {
  const teamSelected = useRef("");

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    answerReceived(teamSelected.current);
    EventBus.$emit("ANSWER_SUBMITED");
  };

  const teamChanged = (team: string) => {
    teamSelected.current = team;
  };

  return (
    <form onSubmit={submitHandler}>
      <SearchInput teamChanged={teamChanged} />
      <SubmitButton />
    </form>
  );
}
