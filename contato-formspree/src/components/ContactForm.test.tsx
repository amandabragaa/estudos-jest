import { render, screen } from "@testing-library/react";
import ContactForm from "./ContactForm";
import { userEvent } from "@testing-library/user-event";

global.fetch = jest.fn();

const dadosFormulario = {
  nome: "Ana",
  email: "ana@example.com",
  assunto: "Testando o envio de formulário",
  mensagem: "Olá, gostaria de saber mais sobre seus serviços.",
};

const preencheEEnviaFormulario = async (
  user: ReturnType<typeof userEvent.setup>,
) => {
  await user.type(screen.getByLabelText("Nome"), dadosFormulario.nome);
  await user.type(screen.getByLabelText("Email"), dadosFormulario.email);
  await user.type(screen.getByLabelText("Assunto"), dadosFormulario.assunto);
  await user.type(screen.getByLabelText("Mensagem"), dadosFormulario.mensagem);
  await user.click(screen.getByRole("button", { name: /enviar/i }));
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("ContactForm", () => {
  it("exibe mensagem de sucesso ao enviar formulário", async () => {
    (fetch as jest.Mock).mockResolvedValue({ ok: true });
    const user = userEvent.setup();
    render(<ContactForm />);
    await preencheEEnviaFormulario(user);

    expect(await screen.findByText(/mensagem enviada/i)).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(1);

    const [url, options] = (fetch as jest.Mock).mock.calls[0];

    expect(url).toEqual(
      expect.stringContaining("https://formspree.io/f/teste"),
    );

    expect(options).toEqual(
      expect.objectContaining({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosFormulario),
      }),
    );

    expect(JSON.parse(options.body)).toEqual(dadosFormulario);

    expect(screen.getByLabelText("Nome")).toHaveValue("");
    expect(screen.getByLabelText("Email")).toHaveValue("");
    expect(screen.getByLabelText("Assunto")).toHaveValue("");
    expect(screen.getByLabelText("Mensagem")).toHaveValue("");
  });

  it("exibe mensagem de erro ao falhar o envio do formulário", async () => {
    (fetch as jest.Mock).mockResolvedValue({ ok: false });
    const user = userEvent.setup();
    render(<ContactForm />);
    await preencheEEnviaFormulario(user);

    expect(await screen.findByText(/algo deu errado/i)).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(screen.getByLabelText("Nome")).toHaveValue(dadosFormulario.nome);
  });

  it("Submit inválido não chama o fetch ", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: /enviar/i }));
    expect(fetch).not.toHaveBeenCalled();
  });
});
