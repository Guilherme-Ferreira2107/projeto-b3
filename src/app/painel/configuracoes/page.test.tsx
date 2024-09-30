import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Configuracoes from "./page";

const mockStore = configureMockStore();

describe("Configuracoes Page", () => {
  it("renders the configuration form correctly", () => {
    const store = mockStore({ user: {} });

    render(
      <Provider store={store}>
        <Configuracoes />
      </Provider>
    );

    expect(screen.getByText(/Preferências de tema/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Preferências de notificação/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Salvar/i })).toBeInTheDocument();
  });

  it("submits the form with correct data", async () => {
    const store = mockStore({ user: {} });

    render(
      <Provider store={store}>
        <Configuracoes />
      </Provider>
    );

    const themeCheckbox = screen.getByText(/Preferências de tema/i);
    const notificationCheckbox = screen.getByText(
      /Preferências de notificação/i
    );
    const submitButton = screen.getByRole("button", { name: /Salvar/i });

    await userEvent.click(themeCheckbox);
    await userEvent.click(notificationCheckbox);
    await userEvent.click(submitButton);
  });
});
