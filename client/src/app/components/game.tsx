"use client";

import { useState } from "react";
import AnswerForm from "./answer-form";

export default function Game() {
  const [teamSelected, setTeamSelected] = useState("");

  return (
    <>
      {/* <code>{JSON.stringify(result, null, 2)}</code> */}
      <AnswerForm answerReceived={setTeamSelected} />
      {teamSelected && <div>Time selecionado: {teamSelected}</div>}
    </>
  );
}
