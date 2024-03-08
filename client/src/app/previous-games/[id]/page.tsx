import { Suspense } from "react";

import PastGame from "@/components/game/past-game";
import PastGameCard from "@/components/day-game-card/past-game-card";

interface PreviousGameProps {
  params: { id: string };
}

function Loading() {
  return (
    <div className="text-center bg-white shadow-md border-gray-300 text-lg py-4 rounded-md">
      Carregando...
    </div>
  );
}

export default function PreviousGame({ params }: PreviousGameProps) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <PastGameCard number={params.id} />
        <PastGame number={params.id} />
      </Suspense>
    </>
  );
}
