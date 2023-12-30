import PastGame from "@/app/components/game/past-game";
import PastGameCard from "@/app/components/day-game-card/past-game-card";

interface PreviousGameProps {
  params: { id: string };
}

export default async function PreviousGame({ params }: PreviousGameProps) {
  return (
    <>
      <PastGameCard number={params.id} />
      <PastGame number={params.id} />
    </>
  );
}
