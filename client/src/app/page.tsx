import Link from "next/link";
import { getDailyGame } from "./actions";
import Game from "./components/game/game";
import TodayGameCard from "./components/day-game-card/today-game-card";

export default async function Home() {
  await getDailyGame();

  return (
    <>
      <TodayGameCard />
      <Game />
      <Link href="/previous-games" className="link-primary">
        Jogos anteriores
      </Link>
    </>
  );
}
