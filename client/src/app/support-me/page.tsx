import Link from "next/link";

import ClipboardButton from "./clipboard-button";

export default function PageSupportMe() {
  return (
    <section className="bg-white shadow-md border-gray-200 rounded-md p-4">
      <h2 className="text-2xl mb-2 font-medium">Apoie!</h2>
      <p>
        Caso gostou e quer apoiar de alguma maneira, minha chave pix está
        abaixo, assim como alguns dos meus contatos, caso queria tirar dúvidas
        técnicas ou curiosidades.
      </p>

      <ClipboardButton />

      <p className="my-4 text-center">
        e-mail: <span className="font-medium">{process.env.EMAIL}</span> |{" "}
        <a
          className="underline font-medium"
          href={process.env.TWITTER_URL}
          target="_blank"
        >
          twitter
        </a>
      </p>

      <Link href="/" className="mt-4 underline text-center block">
        Voltar para o início
      </Link>
    </section>
  );
}
