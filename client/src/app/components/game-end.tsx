interface GameEndInterface {
  answer: string;
  correct: boolean;
}

export default function GameEnd({ answer, correct }: GameEndInterface) {
  const cardClasses = [
    "py-4",
    "bg-white",
    "border-4",
    "shadow-md",
    "rounded-md",
    "text-center",
    correct ? "border-green-500" : "border-red-500",
  ].join(" ");

  function mainLabel() {
    let label = "Fim de jogo, boa sorte na próxima!";
    let classes = ["font-medium", "text-xl", "text-red-600"];

    if (correct) {
      classes[2] = "text-green-600";
      label = "Boaa, você acertou o time!";
    }

    return <div className={classes.join(" ")}>{label}</div>;
  }

  const labelInfo = correct ? "O time era:" : "O time correto era:";

  return (
    <section className={cardClasses}>
      {mainLabel()}
      <div className="my-2">{labelInfo}</div>
      <div className="text-2xl font-medium">{answer}</div>
    </section>
  );
}
