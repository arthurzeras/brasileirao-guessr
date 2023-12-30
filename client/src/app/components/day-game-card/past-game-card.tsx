import DayGameCard from "./day-game-card";
import { getSpecificDayGame } from "@/app/actions";

export default async function PastGameCard({ day }: { day: string }) {
  const result = await getSpecificDayGame(day);

  if (!("game" in result)) {
    return <div className="text-center">Não foi possível carregar o jogo</div>;
  }

  return <DayGameCard game={result.game} />;
}
