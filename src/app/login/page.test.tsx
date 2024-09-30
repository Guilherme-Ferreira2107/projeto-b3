import React from "react";
import { Provider } from "react-redux";
import { useRouter } from "next/navigation";
import configureMockStore from "redux-mock-store";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";

import Login from "./page";

const mockStore = configureMockStore();

describe("Login Component", () => {
  const mockRouter = { push: jest.fn() };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    mockRouter.push.mockClear();
  });

  it("renders the login form correctly", () => {
    const store = mockStore({ user: {} });

    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Entrar/i })).toBeInTheDocument();
    expect(
      screen.getByText(/Não tem uma conta\? Cadastre-se agora!/i)
    ).toBeInTheDocument();
  });

  it("allows user to type in the email field", async () => {
    const fieldEmailMock = "ana@gmail.com";
    const store = mockStore({ user: {} });

    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const inputEmail = screen.getByLabelText("E-mail");

    await userEvent.type(inputEmail, fieldEmailMock);
    await waitFor(() => {
      expect(inputEmail).toHaveValue(fieldEmailMock);
    });
  });

  it("submits the form with correct data", async () => {
    const store = mockStore({ user: {} });
    const submitEmail = "test@example.com";

    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const inputEmail = screen.getByLabelText("E-mail");
    const submitButton = screen.getByRole("button", { name: /Entrar/i });

    await userEvent.type(inputEmail, submitEmail);
    await userEvent.click(submitButton);

    const actions = store.getActions();
    expect(actions).toEqual([
      { type: "user/loginUser", payload: { email: submitEmail } },
    ]);
  });

  it("redirects to dashboard if user is authenticated", async () => {
    const initialState = {
      user: {
        email: "existingUser@example.com",
        isAuthenticated: true,
      },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith("/painel/dashboard");
    });
  });
});
