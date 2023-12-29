import { GetDailyGameResponse } from "../actions";

interface TipCardProps {
  tipNumber: number;
  dailyGame: GetDailyGameResponse | undefined;
}

export default function TipCard({ tipNumber, dailyGame }: TipCardProps) {
  function getTip() {
    if (!dailyGame) {
      return "";
    }

    const topWin = dailyGame.game.top_win;
    const year = Number(dailyGame.game.year);
    const topScorer = dailyGame.game.top_scorer;
    const lastLeague = dailyGame.game.last_league_postion;

    const tips = [
      `A maior goleada desse time foi um ${topWin.goals_scored}x${topWin.goals_conceded} em cima do(a) ${topWin.against_to}`,
      `No ano anterior (${year - 1}), esse time ficou na ${lastLeague.position}º posição do Brasileirão Série ${lastLeague.division}`, // prettier-ignore
      `Esse time foi fundado no ano de ${dailyGame.game.foundation_year}`,
      `O artilheiro desse time nesse ano foi o ${topScorer.name} com ${topScorer.goals} gols marcados`,
      `Esse time é do estado do(a) ${dailyGame.game.state}`,
    ];

    return tips[tipNumber - 1];
  }

  return (
    <div
      className={`bg-amber-300 border border-amber-600 rounded-md px-3 py-4 shadow-sm text-md`}
    >
      Dica {tipNumber}: {getTip()}
    </div>
  );
}
