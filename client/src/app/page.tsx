import { getDailyGame } from "../actions";
import TodayGame from "../components/game/today-game";
import TodayGameCard from "../components/day-game-card/today-game-card";

export default async function Home() {
  await getDailyGame();

  return (
    <>
      <TodayGameCard />
      <TodayGame />
    </>
  );
}
