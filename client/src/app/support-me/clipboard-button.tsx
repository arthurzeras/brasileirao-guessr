"use client";

import { useState } from "react";

export default function ClipboardButton() {
  const [shareButtonClicked, setShareButtonClicked] = useState(false);

  const handleButtonClick = () => {
    navigator.clipboard.writeText(process.env.NEXT_PUBLIC_PIX_KEY || "");
    setShareButtonClicked(true);
    setTimeout(() => {
      setShareButtonClicked(false);
    }, 2000);
  };

  const buttonText = shareButtonClicked
    ? "Copiado!"
    : `Copiar chave Pix: ${process.env.NEXT_PUBLIC_PIX_KEY}`;

  return (
    <button
      onClick={handleButtonClick}
      className="bg-slate-500 text-white rounded-md px-4 py-2 mt-4 mx-auto block"
    >
      {buttonText}
    </button>
  );
}
