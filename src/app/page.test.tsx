import React from "react";
import { useRouter } from "next/navigation";
import { render, screen } from "@testing-library/react";

import Home from "./page";

describe("Home Component", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    render(<Home />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders welcome message and descriptions", () => {
    expect(
      screen.getByRole("heading", {
        name: /Bem-vindo ao Projeto de Cotações de Moedas/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Gerencie seu perfil, personalize o tema e acompanhe as cotações de moedas em tempo real./i,
      })
    ).toBeInTheDocument();

    expect(screen.getByText(/Cadastro de Usuário/i)).toBeInTheDocument();
    expect(screen.getByText(/Personalização de Tema/i)).toBeInTheDocument();
    expect(screen.getByText(/Tabela de Moedas/i)).toBeInTheDocument();
  });

  it("navigates to /login when 'Começar Agora' button is clicked", () => {
    const startButton = screen.getByRole("button", { name: /Começar Agora/i });
    expect(startButton).toBeInTheDocument();

    startButton.click();

    expect(mockPush).toHaveBeenCalledWith("/login");
  });
});
