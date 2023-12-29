export default function GameOver({ answer }: { answer: string }) {
  return (
    <section className="text-center bg-white rounded-md shadow-md py-4">
      <div className="text-red-600 font-medium text-xl">
        Fim de jogo, boa sorte na próxima!
      </div>
      <div className="my-2">O time correto era:</div>
      <div className="text-2xl font-medium">{answer}</div>
    </section>
  );
}
