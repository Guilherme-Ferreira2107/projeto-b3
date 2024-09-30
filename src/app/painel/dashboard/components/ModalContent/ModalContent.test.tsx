import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import { IRows } from "@/components/Table/interfaces";

import { ModalContent } from "./ModalContent";

describe("ModalContent Component", () => {
  const mockHandleClose = jest.fn();
  const selectedRow: IRows = {
    id: "987987987",
    currency: "USD",
    date: "2024-09-27T12:00:00Z",
    value: "100.00",
  };

  beforeEach(() => {
    render(
      <ModalContent selectedRow={selectedRow} handleClose={mockHandleClose} />
    );
  });

  it("renders the modal content with the correct details", () => {
    expect(screen.getByText("Detalhes da moeda")).toBeInTheDocument();
    expect(screen.getByText(/ID:/i)).toBeInTheDocument();
    expect(screen.getByText(/987987987/i)).toBeInTheDocument();
    expect(screen.getByText(/Moeda:/i)).toBeInTheDocument();
    expect(screen.getByText(/USD/i)).toBeInTheDocument();
    expect(screen.getByText(/Dia e hora:/i)).toBeInTheDocument();
    expect(screen.getByText(/2024-09-27T12:00:00Z/i)).toBeInTheDocument();
    expect(screen.getByText(/Valor:/i)).toBeInTheDocument();
    expect(screen.getByText(/100.00/i)).toBeInTheDocument();
  });

  it("calls handleClose when the button is clicked", async () => {
    const closeButton = screen.getByRole("button", { name: /Fechar/i });

    await userEvent.click(closeButton);

    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });
});
