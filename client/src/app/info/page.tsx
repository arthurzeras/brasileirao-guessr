import Link from "next/link";

export default function PageInfo() {
  return (
    <section className="bg-white shadow-md border-gray-200 rounded-md p-4">
      <h2 className="text-2xl mb-2 font-medium">Sobre o jogo</h2>

      <p>
        A ideia do Brasileirão Guessr veio de jogos como o Wordle, Termoo,
        Timeguessr, Guess The Game, entre outros. Porém trazendo uma temática
        bem específica para o nosso país
      </p>

      <h2 className="text-2xl mt-2 font-medium">Autor</h2>
      <p>
        O desenvolvimento do jogo, consulta e obtenção dos dados utilizados
        foram todos realizados por Arthur Oliveira. Para dúvidas e comentários,
        alguns contatos abaixo:
      </p>
      <p className="my-4">
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
