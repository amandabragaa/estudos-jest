# Contato Formspree

Formulário de contato construído com **Next.js 16** (App Router), com validação de dados e envio integrado ao [Formspree](https://formspree.io) — sem necessidade de backend próprio.

## Stack

- **Next.js 16** + **React 19** + **TypeScript**
- **Tailwind CSS 4** — estilização
- **React Hook Form** — gerenciamento do formulário
- **Zod** + `@hookform/resolvers` — validação do schema
- **Formspree** — recebimento das mensagens por e-mail

## Estrutura

```
├── lib/
│   └── schema.ts              # Schema de validação Zod (nome, email, assunto, mensagem)
├── src/
│   ├── app/
│   │   └── page.tsx           # Página inicial (renderiza o formulário)
│   └── components/
│       └── ContactForm.tsx    # Formulário de contato (client component)
└── .vscode/
    └── launch.json            # Configurações de debug do Next.js no VS Code
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

| Comando         | Descrição                        |
| --------------- | -------------------------------- |
| `npm run dev`   | Servidor de desenvolvimento      |
| `npm run build` | Build de produção                |
| `npm run start` | Sobe o build de produção         |
| `npm run lint`  | Análise estática com ESLint      |

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
