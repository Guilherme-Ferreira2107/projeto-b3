import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Tooltip,
  useTheme,
} from "@mui/material";
import {
  Settings,
  Menu as MenuIconMui,
  AccountCircle,
  Leaderboard,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

const Menu: React.FC = () => {
  const theme = useTheme();
  const { push } = useRouter();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const goTo = (path: string) => {
    push(path);
    setOpen(false);
  };

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => goTo("/painel/dashboard")}>
            <ListItemIcon>
              <Leaderboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => goTo("/painel/perfil")}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Perfil" />
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem disablePadding>
          <ListItemButton onClick={() => goTo("/painel/configuracoes")}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Preferências" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Menu">
          <IconButton
            onClick={toggleDrawer(true)}
            size="small"
            aria-label="menu"
          >
            <MenuIconMui sx={{ color: theme.palette.common.white }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </React.Fragment>
  );
};

export default Menu;
