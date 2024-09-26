"use client";

import { useRouter } from "next/navigation";
import { Suspense, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider, Box } from "@mui/material";

import { RootState } from "@/store";
import { getTheme } from "@/styles/theme";
import { Header, Loading } from "@/components";

import styles from "./painel.module.css";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);

  const theme = useMemo(
    () => getTheme(user.darkMode ? "dark" : "light"),
    [user]
  );

  useEffect(() => {
    if (!user.isAuthenticated) router.push("/");
  }, [user, router]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Box
        className={styles.boxContainer}
        bgcolor={theme.palette.background.default}
      >
        <Suspense fallback={<Loading />}>
          <Box className={styles.containerPainel}>{children}</Box>
        </Suspense>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
