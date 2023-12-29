import Game from "./components/game";
import { getDailyGame } from "./actions";
import DailyGameBox from "./components/daily-game-box";

export default async function Home() {
  await getDailyGame();

  return (
    <main className="flex justify-center h-screen">
      <section className="flex flex-col gap-4 h-screen w-full md:w-[34rem] py-8 px-4 md:px-0">
        <h1 className="text-3xl font-medium text-center">
          ⚽ Brasileirão Guessr
        </h1>

        <DailyGameBox />
        <Game />
      </section>
    </main>
  );
}
