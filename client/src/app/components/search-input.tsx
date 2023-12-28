"use client";

import { useEffect, useRef, useState } from "react";
import { getDailyGame, GetDailyGameResponse } from "../actions";

const removeSpecialCharacter = (str: string) => {
  return str
    .replace(/[ãàá]/g, "a")
    .replace(/[êé]/g, "e")
    .replace(/í/g, "i")
    .replace(/[õôó]/g, "o")
    .replace(/ú/g, "u")
    .replace(/ç/g, "c")
    .replace(/[-\s]/, "");
};

export default function SearchInput() {
  const dailyGame = useRef<GetDailyGameResponse>();
  const containerRef = useRef<HTMLDivElement>(null);

  const [inputValue, setInputValue] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [teamsFiltered, setTeamsFiltered] = useState<string[]>([]);

  useEffect(() => {
    getDailyGame().then((response) => {
      if ("failed" in response) {
        console.error(response.message);
        return;
      }

      dailyGame.current = response;
      setTeamsFiltered((dailyGame.current?.all_teams || []).sort());
    });
  }, []);

  useEffect(() => {
    const listenerHandler = (event: Event) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setDialogOpen(false);
      }
    };

    window.addEventListener("click", listenerHandler);
    return () => {
      window.removeEventListener("click", listenerHandler);
    };
  });

  const filterTeams = (value: string) => {
    setInputValue(value);

    const filteredTeams = (dailyGame.current?.all_teams || []).filter(
      (team) => {
        const teamName = removeSpecialCharacter(team);
        const inputValue = removeSpecialCharacter(value);

        return new RegExp(inputValue, "gi").test(teamName);
      },
    );

    setTeamsFiltered(filteredTeams.sort());
  };

  const selectTeam = (team: string) => {
    setInputValue(team);
    setDialogOpen(false);
  };

  const renderDialog = () => {
    if (dialogOpen) {
      return (
        <div className="absolute w-full bg-white shadow-md border rounded-md max-h-80 overflow-y-auto">
          <ul>
            {teamsFiltered.map((team) => (
              <li
                key={team}
                onClick={() => selectTeam(team)}
                className="p-2 hover:bg-slate-100 cursor-pointer"
              >
                {team}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return null;
  };

  return (
    <div ref={containerRef} className="w-full relative">
      <input
        type="text"
        value={inputValue}
        onFocus={() => setDialogOpen(true)}
        placeholder="Digite o time aqui..."
        className="w-full border-2 h-10 px-4 rounded-md shadow-sm"
        onChange={(event) =>
          filterTeams((event.target as HTMLInputElement).value)
        }
      />

      {renderDialog()}
    </div>
  );
}
