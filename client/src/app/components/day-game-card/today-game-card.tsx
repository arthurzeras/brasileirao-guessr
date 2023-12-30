import DayGameCard from "./day-game-card";
import { getDailyGame } from "@/app/actions";

export default async function DailyGameCard() {
  const result = await getDailyGame();

  if (!("game" in result)) {
    return <div className="text-center">Não foi possível carregar o jogo</div>;
  }

  return <DayGameCard game={result.game} />;
}
