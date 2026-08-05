import { z } from "zod";

export const contactSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome muito longo"),
  email: z.string().email("Email inválido"),
  assunto: z
    .string()
    .min(3, "Assunto é obrigatório")
    .max(200, "Assunto muito longo"),
  mensagem: z
    .string()
    .min(10, "Mensagem deve ter pelo menos 10 caracteres")
    .max(2000, "Mensagem muito longa"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
