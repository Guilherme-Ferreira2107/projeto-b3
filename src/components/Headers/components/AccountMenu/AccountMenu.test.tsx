import { Provider } from "react-redux";
import { useRouter } from "next/navigation";
import { configureStore } from "@reduxjs/toolkit";
import { render, screen, fireEvent } from "@testing-library/react";

import userSlice from "@/store/userSlice";

import { AccountMenu } from "./AccountMenu";

describe("AccountMenu Component", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  const renderWithProviders = (component: React.ReactElement) => {
    const store = configureStore({
      reducer: {
        user: userSlice,
      },
    });

    return render(<Provider store={store}>{component}</Provider>);
  };

  it("should open the menu when the avatar is clicked", () => {
    renderWithProviders(<AccountMenu />);

    const avatarButton = screen.getByRole("button", {
      name: /configurações da conta/i,
    });
    fireEvent.click(avatarButton);

    const menu = screen.queryByTestId("account-menu");
    expect(menu).toBeInTheDocument();
  });

  it("should navigate to profile page when clicking 'Perfil'", () => {
    renderWithProviders(<AccountMenu />);

    const avatarButton = screen.getByRole("button", {
      name: /configurações da conta/i,
    });
    fireEvent.click(avatarButton);

    const perfilMenuItem = screen.getByText(/perfil/i);
    fireEvent.click(perfilMenuItem);

    expect(mockPush).toHaveBeenCalledWith("/painel/perfil");
  });

  it("should navigate to settings page when clicking 'Preferências'", () => {
    renderWithProviders(<AccountMenu />);

    const avatarButton = screen.getByRole("button", {
      name: /configurações da conta/i,
    });
    fireEvent.click(avatarButton);

    const settingsMenuItem = screen.getByText(/preferências/i);
    fireEvent.click(settingsMenuItem);

    expect(mockPush).toHaveBeenCalledWith("/painel/configuracoes");
  });

  it("should navigate to settings page when clicking 'Preferências'", () => {
    renderWithProviders(<AccountMenu />);

    const avatarButton = screen.getByRole("button", {
      name: /configurações da conta/i,
    });

    fireEvent.click(avatarButton);

    const logoutMenuItem = screen.getByText(/Logout/i);

    fireEvent.click(logoutMenuItem);
  });
});
