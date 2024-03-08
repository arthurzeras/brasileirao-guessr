"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import EventBus from "@/bus";
import { storage } from "@/storage";
import { getDailyGame, getSpecificDayGame } from "@/actions";
import { getTeamNameSlug, removeSpecialCharacter } from "@/utis";

interface SearchInputProps {
  teamChanged: (team: string) => void;
}

function removeSpecialCharacterFromTeamName(teamName: string) {
  return removeSpecialCharacter(teamName).replace(/[-\s]/, "");
}

export default function SearchInput({ teamChanged }: SearchInputProps) {
  const allTeams = useRef<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [teamsFiltered, setTeamsFiltered] = useState<string[]>([]);
  const [teamsAttemptedInStorage, setTeamsAttemptedInStorage] = useState<
    string[]
  >([]);

  EventBus.$on("ANSWER_SUBMITTED", ({ team }: { team: string }) => {
    teamChanged("");
    setInputValue("");
    setTeamsAttemptedInStorage([...teamsAttemptedInStorage, team]);
    setTeamsFiltered(teamsFiltered.filter((_team) => _team !== team));
  });

  useEffect(() => {
    const gameNumber = window.location.pathname.at(-1) || "";

    const getDayAction = Number.isNaN(Number(gameNumber))
      ? getDailyGame()
      : getSpecificDayGame(gameNumber);

    getDayAction
      .then((response) => {
        if (!response || "failed" in response) {
          return;
        }

        const allTeamsFromResponse = (response.all_teams || []).sort();
        const storageValues = storage.getDay(response.game.day);

        allTeams.current = allTeamsFromResponse;

        if (storageValues) {
          const storageTeamsAttempted = storageValues.teamsAttempted || [];

          setTeamsAttemptedInStorage(storageTeamsAttempted);

          storageTeamsAttempted.forEach((team) => {
            setTeamsFiltered(
              allTeamsFromResponse.filter(
                (teamFromResponse) => teamFromResponse !== team,
              ),
            );
          });

          return;
        }

        setTeamsFiltered(allTeamsFromResponse);
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

    let filteredTeams = allTeams.current.filter((team) => {
      if (teamsAttemptedInStorage.includes(team)) {
        return;
      }

      const teamName = removeSpecialCharacterFromTeamName(team);
      const inputValue = removeSpecialCharacterFromTeamName(value);
      return new RegExp(inputValue, "gi").test(teamName);
    });

    if (filteredTeams.length === 0) {
      filteredTeams = allTeams.current;
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
        className="p-2 hover:bg-slate-100 cursor-pointer flex flex-row items-center gap-2"
      >
        <div className="h-8 w-8 relative">
          <Image
            fill
            alt={`Escudo do(a) ${team}`}
            className="object-cover relative"
            sizes="40px"
            src={`/images/logos/${getTeamNameSlug(team)}.png`}
          />
        </div>
        <span>{team}</span>
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
