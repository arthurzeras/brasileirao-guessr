import Link from "next/link";
import { getDailyGame } from "@/app/actions";
import GridCard from "./components/grid-card";

export default async function PreviousGames() {
  const todayGame = await getDailyGame();

  function renderGridCards() {
    if ("game" in todayGame) {
      return [...Array(todayGame.game.game_number - 1)].map((_, index) => (
        <GridCard key={index + 1} number={index + 1} />
      ));
    }
  }

  return (
    <>
      <h2 className="text-2xl text-center">Jogos anteriores</h2>
      <Link href="/" className="link-primary">
        Voltar para o jogo de hoje
      </Link>
      <section className="grid grid-cols-6 sm:grid-cols-10 gap-2 overflow-y-auto">
        {renderGridCards()}
      </section>
    </>
  );
}
