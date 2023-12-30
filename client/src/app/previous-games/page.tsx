import Link from "next/link";
import GridCard from "./components/grid-card";

export default function PreviousGames() {
  function renderGridCards() {
    return [...Array(150)].map((_, index) => (
      <GridCard key={index} number={index} />
    ));
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
