# Brasileirão Guessr

Um joguinho de adivinhação diário cujo objetivo é acertar qual foi o time que ficou em determinada posição do brasileirão de algum ano aleatório (a partir de 2003, somente pontos corridos).

## Arquitetura
As informações de cada jogo diário está armazenada numa planilha do Google Sheets, essa planilha serve como um "banco de dados".

Existe uma função Lambda (AWS) escrita Python que lê a planilha e retorna o jogo diário baseado no parâmetro "dia" que é enviado pela URL, a função lambda é ativada através de uma trigger com o AWS APIGateway.

TODO: O Frontend é um SSR utilizando Next.js (React) que roda no AWS Amplify, consulta o endpoint fornecido pelo APIGateway e monta a tela com as etapas para que o jogador acerte o time.

## Executando a função Lambda localmente

A função Lambda é implantada usando o Lambda Containers, então é necessário construir uma imagem docker para testar o funcionamento local.

Construir a imagem:
```bash
cd lambda && docker build -t brasileirao-guessr .
```

Rodar a imagem:

Este comando irá subir um servidor HTTP na porta `9000` da sua máquina.
```bash
docker run --env-file .env -v $HOME/.aws:/root/.aws -p 9000:8080 --rm brasileirao-guessr
```
> NOTA 1: É necessário configurar o .env com as variáveis corretas

> NOTA 2: É necessário configurar suas credenciais de acesso à AWS dentro da pasta `.aws`, [veja aqui](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) detalhes de como fazer isso.

Para invocar a função localmente basta fazer uma requisição `POST` para o endpoint abaixo, veja o exemplo utilizando cURL:
```bash
curl -X POST http://localhost:9000/2015-03-31/functions/function/invocations -d '{}'
```

Mesmo que não vá enviar nenhum parâmetro no body, é preciso informá-lo. Caso contrário irá ocorrer um erro.

Abaixo um exemplo utilizando o filtro `day`:
```bash
curl -X POST http://localhost:9000/2015-03-31/functions/function/invocations -d '{"day": "01/01/2024"}'
```