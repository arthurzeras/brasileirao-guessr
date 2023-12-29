import Game from "./components/game";
import { getDailyGame } from "./actions";
import DailyGameBox from "./components/daily-game-box";

export default async function Home() {
  await getDailyGame();

  return (
    <>
      <DailyGameBox />
      <Game />
    </>
  );
}
