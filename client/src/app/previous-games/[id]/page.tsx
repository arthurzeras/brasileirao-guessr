import Link from "next/link";
import { getDailyGame } from "@/app/actions";
import PastGame from "@/app/components/game/past-game";
import PastGameCard from "@/app/components/day-game-card/past-game-card";

interface PreviousGameProps {
  params: { id: string };
}

export default async function PreviousGame({ params }: PreviousGameProps) {
  let currentGameDay = "";
  const todayGame = await getDailyGame();

  if ("game" in todayGame) {
    const currentGameNumber = Number(params.id);
    const todayGameNumber = todayGame.game.game_number;
    const daysToSubtract = todayGameNumber - currentGameNumber;
    const currentGameDate = new Date(Date.now() - daysToSubtract * 86400000);
    currentGameDay = currentGameDate.toLocaleDateString("pt-BR");
  }

  return (
    <>
      <PastGameCard day={currentGameDay} />
      <PastGame day={currentGameDay} />
      <Link href="/previous-games" className="link-primary">
        Jogos anteriores
      </Link>
    </>
  );
}
