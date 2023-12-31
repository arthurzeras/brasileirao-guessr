import Link from "next/link";

export default function PageHelp() {
  return (
    <section className="bg-white shadow-md border-gray-200 rounded-md p-4">
      <h2 className="text-2xl mb-2 font-medium">Como jogar</h2>

      <p>
        O objetivo do jogo é descobrir qual time ficou em determinada posição do
        Brasileirão de determinado ano. Você tem 6 chances para descobrir o
        time. Ao escolher o time e pressionar o botão &quot;ENVIAR&quot;, a
        resposta será processada.
      </p>

      <h3 className="font-medium text-lg mt-2">Resposta errada</h3>
      <p>
        Caso sua resposta esteja errada, uma nova dica é exibida e o time que
        você escolheu é removido das opções disponíveis.
      </p>

      <h3 className="font-medium text-lg mt-2">Resposta certa</h3>
      <p>
        Caso sua resposta esteja correta, o jogo acaba e você recebe uma
        mensagem de sucesso.
      </p>

      <h3 className="font-medium text-lg mt-2">Chances esgotadas</h3>
      <p>
        Caso você tenha tentado 6 vezes e não conseguiu acertar o time, o jogo
        acaba, você recebe uma mensagem dizendo que não ganhou e a resposta é
        revelada.
      </p>

      <h3 className="font-medium text-lg mt-2">Novo jogo</h3>
      <p>
        Todos os dias um novo jogo é gerado, ou seja, se você acessar o jogo
        hoje o time vai ser diferente do que foi ontem.
      </p>

      <h3 className="font-medium text-lg mt-2">Jogo em memória</h3>
      <p>
        Todas as vezes que você tenta acertar o time ou terminar o jogo, ele é
        salvo na memória interna do seu navegador, ou seja, você pode voltar
        depois para verificar o seu desempenho, ou até mesmo terminar de jogar
        depois.
      </p>

      <h3 className="font-medium text-lg mt-2">Jogos anteriores</h3>
      <p>
        Você pode jogar os jogos de dias anteriores clicando no botão
        &quot;Jogos anteriores&quot; abaixo.
      </p>

      <Link href="/" className="mt-4 underline text-center block">
        Voltar para o início
      </Link>
    </section>
  );
}
