import React from "react";
import { useRouter } from "next/navigation";
import { render, screen, fireEvent } from "@testing-library/react";

import Home from "./page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Home Component", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders Home with correct content", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /bem-vindo ao projeto de cotações de moedas/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/gerencie seu perfil, personalize o tema/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/cadastro de usuário/i)).toBeInTheDocument();
    expect(screen.getByText(/personalização de tema/i)).toBeInTheDocument();
    expect(screen.getByText(/tabela de moedas/i)).toBeInTheDocument();
  });

  it("navigates to the login page when 'Começar Agora' button is clicked", () => {
    render(<Home />);

    const button = screen.getByRole("button", { name: /começar agora/i });

    fireEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith("/login");
  });
});
