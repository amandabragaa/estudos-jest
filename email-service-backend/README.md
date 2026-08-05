# Estudo de Jest — Email Service Backend

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)

Repositório criado para estudar **testes unitários com Jest** em uma API Node.js de disparo de e-mails.

Este projeto é baseado no repositório [email-service-backend](https://github.com/Fernanda-Kipper/email-service-backend) da [Fernanda Kipper](https://github.com/Fernanda-Kipper), usado aqui apenas como base de código para praticar testes. Todo o crédito da aplicação original é dela.

## O que foi praticado aqui

- Configuração do Jest em um projeto Node.js (`jest.config.js`)
- Testes unitários de controllers com `describe`, `it` e `expect`
- Mock de módulos com `jest.mock()` usando **factory**, para evitar efeitos colaterais (como abrir conexão com o Redis durante os testes)
- Uso de `jest.fn()`, `mockReturnThis`, `mockRejectedValue` e `jest.clearAllMocks`

## Tecnologias

- [Node.js](https://nodejs.org/) + [Fastify](https://fastify.dev/) — API REST
- [Jest](https://jestjs.io/) — framework de testes
- [Bull](https://github.com/OptimalBits/bull) + [Redis](https://redis.io/) — fila de mensagens
- [AWS SDK (SES)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SES.html) — envio de e-mails

## Como rodar os testes

```shell
npm install
npm test
```

Os testes ficam em `src/controllers/tests/` e **não precisam** de Redis nem de credenciais AWS, pois a fila é mockada.

## Como rodar a aplicação

1. Instale as dependências: `npm install`
2. Crie um arquivo `.env` na raiz, usando o `.env.example` como base (credenciais AWS, host/porta do Redis e e-mail remetente)
3. Suba um Redis local (ex.: `docker run -p 6379:6379 redis`)
4. Execute: `npm start`

O servidor sobe na porta `3200` (ou na porta definida em `PORT`).
