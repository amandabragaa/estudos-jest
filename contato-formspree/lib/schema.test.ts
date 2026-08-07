import { contactSchema } from "./schema";

const dadosValidos = {
  nome: "Amanda",
  email: "ana@example.com",
  assunto: "Assunto válido",
  mensagem: "Mensagem válida com mais de 10 caracteres",
};

describe("contactSchema", () => {
  it("aceita dados válidos", () => {
    const result = contactSchema.safeParse(dadosValidos);
    expect(result.success).toBe(true);
  });

  it("rejeita nome com 1 caractere", () => {
    const result = contactSchema.safeParse({ ...dadosValidos, nome: "A" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Nome deve ter pelo menos 2 caracteres",
    );
  });
});
