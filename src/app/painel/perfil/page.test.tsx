import React from "react";
import { Provider } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import configureMockStore from "redux-mock-store";
import userEvent from "@testing-library/user-event";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { USER_AUTHENTUCATED_MOCK } from "@/__mocks__";
import Perfil from "./page";

const mockStore = configureMockStore();

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useForm: jest.fn(),
}));

describe("Perfil Component", () => {
  const mockPush = jest.fn();

  const mockUseForm = {
    register: jest.fn(),
    handleSubmit: jest.fn(),
    formState: {
      errors: {},
    },
  };

  beforeEach(() => {
    (useForm as jest.Mock).mockReturnValue(mockUseForm);
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form correctly", () => {
    const store = mockStore({
      user: USER_AUTHENTUCATED_MOCK,
    });

    render(
      <Provider store={store}>
        <Perfil />
      </Provider>
    );

    expect(screen.getByTestId("input-name")).toBeInTheDocument();
    expect(screen.getByTestId("input-lastname")).toBeInTheDocument();
    expect(screen.getByTestId("input-country")).toBeInTheDocument();
    expect(screen.getByTestId("input-email")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Salvar/i })).toBeInTheDocument();
  });

  it("submits the form with valid inputs", async () => {
    const store = mockStore({
      user: USER_AUTHENTUCATED_MOCK,
    });

    render(
      <Provider store={store}>
        <Perfil />
      </Provider>
    );

    const fieldNameMock = USER_AUTHENTUCATED_MOCK.name;
    const fieldLastnameMock = USER_AUTHENTUCATED_MOCK.lastName;
    const fieldCountryMock = USER_AUTHENTUCATED_MOCK.country;
    const fieldEmailMock = USER_AUTHENTUCATED_MOCK.email;

    mockUseForm.handleSubmit.mockImplementation((callback) => async () => {
      await callback({
        name: fieldNameMock,
        lastName: fieldLastnameMock,
        country: fieldCountryMock,
        email: fieldEmailMock,
      });
    });

    const inputName = screen.getByLabelText("Nome");
    const inputLastname = screen.getByLabelText("Sobrenome");
    const inputCountry = screen.getByLabelText("País");
    const inputEmail = screen.getByLabelText("E-mail");

    await userEvent.type(inputName, fieldNameMock);
    await userEvent.type(inputLastname, fieldLastnameMock);
    await userEvent.type(inputCountry, fieldCountryMock);
    await userEvent.type(inputEmail, fieldEmailMock);

    expect(inputName).toHaveValue(fieldNameMock);
    expect(inputLastname).toHaveValue(fieldLastnameMock);
    expect(inputCountry).toHaveValue(fieldCountryMock);
    expect(inputEmail).toHaveValue(fieldEmailMock);

    const submitButton = screen.getByRole("button", { name: /Salvar/i });

    expect(submitButton).toBeInTheDocument();

    await userEvent.click(submitButton);
  });

  it("shows validation errors when form is submitted with empty fields", async () => {
    const store = mockStore({
      user: USER_AUTHENTUCATED_MOCK,
    });

    mockUseForm.formState.errors = {
      name: { message: "Nome é obrigatório" },
      lastName: { message: "Sobrenome é obrigatório" },
      country: { message: "País é obrigatório" },
      email: { message: "E-mail é obrigatório" },
    };

    render(
      <Provider store={store}>
        <Perfil />
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: /Salvar/i }));

    await waitFor(() => {
      expect(screen.getByText("Nome é obrigatório")).toBeInTheDocument();
      expect(screen.getByText("Sobrenome é obrigatório")).toBeInTheDocument();
      expect(screen.getByText("País é obrigatório")).toBeInTheDocument();
      expect(screen.getByText("E-mail é obrigatório")).toBeInTheDocument();
    });
  });
});
