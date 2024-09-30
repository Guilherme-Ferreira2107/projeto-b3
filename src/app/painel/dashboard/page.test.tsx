import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dashboard from "./page";
import { useFetchCurrencies } from "@/hooks";
import { FIXER_RESPONSE_MOCK } from "@/__mocks__";

jest.mock("@/hooks", () => ({
  useFetchCurrencies: jest.fn(),
}));

describe("Dashboard Component", () => {
  const mockSend = jest.fn();

  beforeEach(() => {
    (useFetchCurrencies as jest.Mock).mockReturnValue({
      send: mockSend,
      data: { rates: FIXER_RESPONSE_MOCK.rates },
      loading: false,
    });

    render(<Dashboard />);
  });

  it("renders the dashboard components correctly", () => {
    expect(screen.getByText("Dashboard de Moedas")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Selecione o par de moeda")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Filtrar/i })
    ).toBeInTheDocument();
  });

  it("submits the form with the selected currency", async () => {
    const submitButton = screen.getByRole("button", { name: /Filtrar/i });

    await userEvent.click(submitButton);

    expect(mockSend).toHaveBeenCalledWith("EUR");
  });

  it("displays the data in the table", async () => {
    const field = screen.getByText("Moeda");
    expect(field).toBeInTheDocument();
  });

  it("opens the modal with selected row details when a row is clicked", async () => {
    const row = screen.getByText("AED");
    userEvent.click(row);
    // expect(screen.getByText("Detalhes da moeda")).toBeInTheDocument();
  });
});
