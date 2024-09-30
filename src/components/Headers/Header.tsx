import React from "react";
import { useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  useTheme,
  Box,
  Button,
} from "@mui/material";

import { RootState } from "@/store";

import { LinkComponent } from "../Link/Link";
import { Menu, AccountMenu } from "./components";

const Header: React.FC = () => {
  const theme = useTheme();
  const user = useSelector((state: RootState) => state.user);

  return (
    <AppBar position="static" sx={{ zIndex: 2 }}>
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", gap: "1rem" }}>
          {!user?.isAuthenticated ? (
            <LinkComponent href="/" color={theme.palette.common.white}>
              Projeto B3
            </LinkComponent>
          ) : (
            <Menu />
          )}
        </Box>

        {user?.isAuthenticated ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Typography variant="body1" color="inherit">
              {`Bem-vindo, ${user?.name}`}
            </Typography>
            <AccountMenu />
          </Box>
        ) : (
          <Button href="/login" variant="contained" color="secondary">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export { Header };
