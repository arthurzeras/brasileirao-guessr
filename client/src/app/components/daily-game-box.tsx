import { getDailyGame } from "../actions";

export default async function DailyGameBox() {
  const result = await getDailyGame();

  if (!("game" in result)) {
    return <div className="text-center">Não foi possível carregar o jogo</div>;
  }

  return (
    <div className="bg-green-500 border border-green-600 rounded-md text-center px-4 py-6 shadow-lg text-lg">
      <div>
        Qual time ficou na {result.game.position}º posição do Brasileirão de{" "}
        {result.game.year}?
      </div>
      <div className="text-sm italic opacity-50">
        dia #{result.game.game_number}
      </div>
    </div>
  );
}
