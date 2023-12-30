import DayGameCard from "./day-game-card";
import { getSpecificDayGame } from "@/app/actions";

export default async function PastGameCard({ number }: { number: string }) {
  const result = await getSpecificDayGame(number);

  if (!("game" in result)) {
    return <div className="text-center">Não foi possível carregar o jogo</div>;
  }

  return <DayGameCard game={result.game} />;
}
