import { useSelector } from "react-redux";
import { render, screen } from "@testing-library/react";

import { Header } from "./Header";
import {
  THEME_MOCKS,
  USER_AUTHENTUCATED_MOCK,
  USER_UNAUTHENTUCATED_MOCK,
} from "@/__mocks__";

jest.mock("react-redux", () => {
  const originalModule = jest.requireActual("react-redux");
  return {
    ...originalModule,
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
  };
});

jest.mock("@mui/material", () => {
  const originalModule = jest.requireActual("@mui/material");
  return {
    ...originalModule,
    useTheme: jest.fn(() => THEME_MOCKS),
    ThemeProvider: ({ children }: never): React.JSX.Element => (
      <div>{children}</div>
    ),
  };
});

describe("MyComponent", () => {
  it("should display user information", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue(
      USER_AUTHENTUCATED_MOCK
    );

    render(<Header />);

    expect(
      screen.getByText(`Bem-vindo, ${USER_AUTHENTUCATED_MOCK.name}`)
    ).toBeInTheDocument();
  });

  it("should display user information", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue(
      USER_UNAUTHENTUCATED_MOCK
    );

    render(<Header />);

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it("should render Menu when user is authenticated", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: true,
    });

    render(<Header />);

    const menu = screen.getByLabelText("menu");
    expect(menu).toBeInTheDocument();
  });

  it("should apply the theme color to the link", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: false,
    });

    render(<Header />);

    const projectLink = screen.getByText(/Projeto B3/i);
    expect(projectLink).toHaveStyle(
      `color: ${THEME_MOCKS.palette.common.white}`
    );
  });
});
