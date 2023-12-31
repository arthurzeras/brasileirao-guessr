import DayGameCard from "./day-game-card";
import { getSpecificDayGame } from "@/app/actions";

export default async function PastGameCard({ number }: { number: string }) {
  const result = await getSpecificDayGame(number);

  if (!("game" in result)) {
    return (
      <div className="flex flex-col items-center mb-8">
        <div className="text-center text-red-600 text-lg font-medium">
          Não foi possível carregar as informações do jogo.
        </div>
        <a
          href="javascript:location.reload()"
          className="text-center shadow-md rounded-md py-1 mt-2 px-4 border bg-slate-300 border-slate-500"
        >
          Recarregar
        </a>
      </div>
    );
  }

  return <DayGameCard game={result.game} />;
}
