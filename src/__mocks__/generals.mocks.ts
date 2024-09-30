import { IUserState } from "@/interfaces";

export const THEME_MOCKS = {
  palette: {
    common: { white: "#fff" },
    secondary: { main: "#1976d2" },
    text: { primary: "#000" },
  },
};

export const USER_AUTHENTUCATED_MOCK: IUserState = {
  name: "Fulaninho",
  lastName: "Santos",
  country: "Brazil",
  email: "fulaninho.santos@example.com",
  isAuthenticated: true,
  darkMode: false,
  allowNotifications: true,
  language: "PT",
};

export const USER_UNAUTHENTUCATED_MOCK: IUserState = {
  name: "",
  lastName: "",
  country: "",
  email: "",
  isAuthenticated: false,
  darkMode: false,
  allowNotifications: false,
  language: "PT",
};
