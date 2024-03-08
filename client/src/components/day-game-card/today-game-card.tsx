import { getDailyGame } from "@/actions";
import DayGameCard from "./day-game-card";

export default async function DailyGameCard() {
  const result = await getDailyGame();

  if (!("game" in result)) {
    return <div className="text-center">Não foi possível carregar o jogo</div>;
  }

  return <DayGameCard game={result.game} />;
}
