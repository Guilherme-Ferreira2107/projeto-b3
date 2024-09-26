import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#004F4D" : "#00a3a1",
      },
      secondary: {
        main: "#A68F97",
      },
      background: {
        default: mode === "light" ? "rgba(255, 255, 255, 0.95)" : "#303030",
        paper: mode === "light" ? "rgba(255, 255, 255, 0.95)" : "#424242",
      },
      text: {
        primary: mode === "light" ? "#1F2024" : "#ffffff",
        secondary: mode === "light" ? "#1F2024" : "#ffffff",
      },
    },
    typography: {
      fontFamily: "Inter, sans-serif",
    },
  });
