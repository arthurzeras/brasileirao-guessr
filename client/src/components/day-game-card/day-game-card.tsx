interface DayGameCardProps {
  game: {
    year: string;
    position: string;
    game_number: number;
  };
}

export default async function DayGameCard({ game }: DayGameCardProps) {
  return (
    <div className="bg-green-500 border border-green-600 rounded-md text-center px-4 py-6 shadow-lg text-lg">
      <div>
        Qual time ficou na {game.position}º posição do Brasileirão de{" "}
        {game.year}?
      </div>
      <div className="text-sm italic opacity-50">dia #{game.game_number}</div>
    </div>
  );
}
