"use client";

import { FormEvent, useRef } from "react";
import SearchInput from "./search-input";

function SubmitButton() {
  return (
    <button
      type="submit"
      className="w-full mt-2 text-center bg-green-500 border-green-600 border h-12 px-4 rounded-md shadow-sm"
    >
      ENVIAR
    </button>
  );
}

export default function AnswerForm({
  answerReceived,
}: {
  answerReceived: (team: string) => void;
}) {
  const teamSelected = useRef("");

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    answerReceived(teamSelected.current);
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
