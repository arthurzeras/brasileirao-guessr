import { useState } from "react";

interface ShareButtonProps {
  score: string[];
  gameNumber: number;
}

export default function ShareButton({ score, gameNumber }: ShareButtonProps) {
  const [shareButtonClicked, setShareButtonClicked] = useState(false);
  const label = [
    `Meu resultado no #BrasileirãoGuessr hoje (dia #${gameNumber}):`,
    score.join(""),
  ];

  const handleButtonClick = () => {
    navigator.clipboard.writeText(label.join(" "));
    setShareButtonClicked(true);
    setTimeout(() => {
      setShareButtonClicked(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleButtonClick}
      className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 mt-4 rounded mx-auto block border-blue-700"
    >
      {shareButtonClicked ? "Copiado!" : "Compartilhar resultado"}
    </button>
  );
}
