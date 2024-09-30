import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import Menu from "./Menu";

jest.mock("@mui/material", () => {
  const originalModule = jest.requireActual("@mui/material");
  return {
    ...originalModule,
    ThemeProvider: ({ children }: never): React.JSX.Element => (
      <div>{children}</div>
    ),
  };
});

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => {
    return {
      push: jest.fn(),
    };
  }),
}));

const mockPush = jest.fn();

describe("Menu Component", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    render(<Menu />);
  });

  it("should close the drawer when an item is clicked", () => {
    const menuButton = screen.getByLabelText("menu");
    fireEvent.click(menuButton);

    const dashboardItem = screen.getByText("Dashboard");
    fireEvent.click(dashboardItem);

    expect(mockPush).toHaveBeenCalledWith("/painel/dashboard");
    expect(screen.queryByRole("presentation")).not.toBeInTheDocument();
  });

  it("should navigate to the profile page when 'Perfil' is clicked", () => {
    const menuButton = screen.getByLabelText("menu");
    fireEvent.click(menuButton);

    const perfilItem = screen.getByText("Perfil");
    fireEvent.click(perfilItem);

    expect(mockPush).toHaveBeenCalledWith("/painel/perfil");
  });

  it("should navigate to the settings page when 'Preferências' is clicked", () => {
    const menuButton = screen.getByLabelText("menu");
    fireEvent.click(menuButton);

    const settingsItem = screen.getByText("Preferências");
    fireEvent.click(settingsItem);

    expect(mockPush).toHaveBeenCalledWith("/painel/configuracoes");
  });
});
