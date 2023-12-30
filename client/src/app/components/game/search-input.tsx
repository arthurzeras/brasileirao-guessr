"use client";

import EventBus from "@/app/bus";
import { useEffect, useRef, useState } from "react";
import { getDailyGame, GetDailyGameResponse } from "@/app/actions";

interface SearchInputProps {
  teamChanged: (team: string) => void;
}

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

export default function SearchInput({ teamChanged }: SearchInputProps) {
  const dailyGame = useRef<GetDailyGameResponse>();
  const containerRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [teamsFiltered, setTeamsFiltered] = useState<string[]>([]);

  EventBus.$on("ANSWER_SUBMITED", ({ team }: { team: string }) => {
    teamChanged("");
    setInputValue("");
    setTeamsFiltered(teamsFiltered.filter((_team) => _team !== team));
  });

  useEffect(() => {
    getDailyGame()
      .then((response) => {
        if ("failed" in response) {
          console.error(response.message);
          return;
        }

        dailyGame.current = response;
        setTeamsFiltered((dailyGame.current?.all_teams || []).sort());
      })
      .finally(() => setLoading(false));
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

    let filteredTeams = (dailyGame.current?.all_teams || []).filter((team) => {
      const teamName = removeSpecialCharacter(team);
      const inputValue = removeSpecialCharacter(value);
      return new RegExp(inputValue, "gi").test(teamName);
    });

    if (filteredTeams.length === 0) {
      filteredTeams = dailyGame.current?.all_teams || [];
    }

    setTeamsFiltered(filteredTeams.sort());
  };

  const selectTeam = (team: string) => {
    setInputValue(team);
    setDialogOpen(false);
    teamChanged(team);
  };

  const renderDialog = () => {
    const listItems = teamsFiltered.map((team) => (
      <li
        key={team}
        onClick={() => selectTeam(team)}
        className="p-2 hover:bg-slate-100 cursor-pointer"
      >
        {team}
      </li>
    ));

    const loadingFeedback = <li className="p-2">Carregando...</li>;

    if (dialogOpen) {
      return (
        <div className="absolute w-full bg-white shadow-md border rounded-md max-h-80 overflow-y-auto">
          <ul>{loading ? loadingFeedback : listItems}</ul>
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
        className="w-full border-2 h-12 px-4 rounded-md shadow-sm"
        onChange={(event) =>
          filterTeams((event.target as HTMLInputElement).value)
        }
      />

      {renderDialog()}
    </div>
  );
}
