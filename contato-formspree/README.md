# Contato Formspree

Formulário de contato construído com **Next.js 16** (App Router), com validação de dados e envio integrado ao [Formspree](https://formspree.io) — sem necessidade de backend próprio.

## Stack

- **Next.js 16** + **React 19** + **TypeScript**
- **Tailwind CSS 4** — estilização
- **React Hook Form** — gerenciamento do formulário
- **Zod** + `@hookform/resolvers` — validação do schema
- **Formspree** — recebimento das mensagens por e-mail
- **Jest** + **Testing Library** — testes unitários e de componente

## Estrutura

```
├── lib/
│   ├── schema.ts                # Schema de validação Zod (nome, email, assunto, mensagem)
│   └── schema.test.ts           # Testes unitários do schema
├── src/
│   ├── app/
│   │   └── page.tsx             # Página inicial (renderiza o formulário)
│   └── components/
│       ├── ContactForm.tsx      # Formulário de contato (client component)
│       └── ContactForm.test.tsx # Testes de componente do formulário
├── jest.config.js               # Configuração do Jest (via next/jest)
├── jest.setup.ts                # Setup global dos testes (matchers do jest-dom)
├── .env.test                    # Variáveis de ambiente usadas apenas nos testes
└── .vscode/
    └── launch.json              # Configurações de debug do Next.js no VS Code
```

## Configuração

1. Instale as dependências:

```bash
npm install
```

2. Crie um arquivo `.env.local` na raiz do projeto com o endpoint do seu formulário Formspree:

```env
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/SEU_ID_AQUI
```

> O endpoint é encontrado no painel do Formspree, após criar um formulário.
> Por ser uma variável `NEXT_PUBLIC_*`, ela é embutida no bundle do navegador —
> isso é esperado, já que o endpoint do Formspree é público por natureza.
> Recomenda-se ativar a **restrição de domínio** e o **anti-spam** no painel do Formspree.

## Rodando o projeto

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

> Após criar ou alterar o `.env.local`, reinicie o servidor — as variáveis de
> ambiente só são lidas na inicialização.

## Scripts

| Comando           | Descrição                          |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Servidor de desenvolvimento        |
| `npm run build`   | Build de produção                  |
| `npm run start`   | Sobe o build de produção           |
| `npm run lint`    | Análise estática com ESLint        |
| `npm test`        | Executa a suíte de testes (Jest)   |
| `npm run test:watch` | Testes em modo watch (reexecuta ao salvar) |

## Debug no VS Code

O projeto inclui configurações prontas em `.vscode/launch.json`:

- **Next.js: debug full stack** — sobe o `next dev` e abre o Chrome já anexado ao debugger (recomendado)
- **Next.js: debug server-side** — debug apenas do código do servidor
- **Next.js: debug client-side** — debug apenas do código do navegador

Aperte `F5` na aba "Run and Debug" (`Ctrl+Shift+D`) com a configuração desejada selecionada.

## Validação do formulário

As regras estão em `lib/schema.ts`:

| Campo     | Regras                          |
| --------- | ------------------------------- |
| `nome`    | mín. 2, máx. 100 caracteres     |
| `email`   | formato de e-mail válido        |
| `assunto` | mín. 3, máx. 200 caracteres     |
| `mensagem`| mín. 10, máx. 2000 caracteres   |

## Testes

O projeto usa **Jest** com **Testing Library**, configurado via `next/jest`
(transformação com SWC, carregamento de env e mocks de CSS/imagens automáticos).
Os testes ficam ao lado do código que testam (colocation).

### O que é coberto

**`lib/schema.test.ts`** — testes unitários do schema Zod:

- aceita um payload válido
- rejeita nome com menos de 2 caracteres, validando a mensagem de erro exata

**`src/components/ContactForm.test.tsx`** — testes de componente, com `fetch`
global mockado (`jest.fn()`) e interações via `userEvent`:

- **sucesso** (`mockResolvedValue({ ok: true })`): exibe a mensagem de sucesso,
  o fetch é chamado uma vez com o contrato correto (URL, método POST, headers e
  body JSON) e o formulário é limpo após o envio
- **erro HTTP** (`mockResolvedValue({ ok: false })`): exibe a mensagem de erro
  e os dados digitados são preservados (sem reset)
- **validação**: submit com campos vazios não dispara o fetch
  (`not.toHaveBeenCalled()`)

Conceitos exercitados: mocks e `mock.calls`, asserts assíncronos com
`findByText`, negação em mocks, `expect.objectContaining` / `stringContaining`,
desserialização do body com `JSON.parse` e extração de helpers/compartilhamento
de dados de teste.

### Variáveis de ambiente nos testes

Em modo de teste (`NODE_ENV=test`), o Next **não carrega o `.env.local`** — por
design, para que os testes produzam o mesmo resultado em qualquer máquina. Por
isso existe o `.env.test`, com um endpoint **fictício** (o fetch é mockado,
nenhuma requisição real é feita):

```env
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/teste
```

Esse arquivo é commitado de propósito (exceção `!.env.test` no `.gitignore`),
já que não contém segredo e garante que a suíte rode verde em qualquer clone.
