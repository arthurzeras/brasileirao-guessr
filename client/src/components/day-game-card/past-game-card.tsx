import DayGameCard from "./day-game-card";
import { getSpecificDayGame } from "@/actions";
import ButtonReloadPage from "../game/button-reload-page";

export default async function PastGameCard({ number }: { number: string }) {
  const result = await getSpecificDayGame(number);

  const reloadButton = `
    <a href="javascript:location.reload()">
      Recarregar
    </a>
  `;

  if (!("game" in result)) {
    return (
      <div className="flex flex-col items-center mb-8">
        <div className="text-center text-red-600 text-lg font-medium">
          Não foi possível carregar as informações do jogo.
        </div>
        <ButtonReloadPage />
      </div>
    );
  }

  return <DayGameCard game={result.game} />;
}
