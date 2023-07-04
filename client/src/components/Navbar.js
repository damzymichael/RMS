import React, { useState } from "react";
import { Toolbar, Stack, Divider, Button } from "@mui/material";
import { Drawer, CssBaseline, IconButton } from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { Menu } from "@mui/icons-material";

const drawerWidth = 240;

const Navbar = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen(!navOpen);
  const navLinkStyles = {
    display: "block",
    padding: "10px",
    width: "100%",
    textAlign: "left",
  };
  const navClick = (route) => {
    navigate(route);
    toggleNav();
  };
  const nav = [
    {
      text: "Dashboard",
      action: () => navClick("/dashboard"),
    },
    { text: "Stocks", action: () => navClick("/stocks") },
    { text: "Users", action: () => navClick("/users") },
    { text: "Orders", action: () => navClick("/orders") },
    { text: "Transactions", action: () => navClick("/transactions") },
    {
      text: "Logout",
      action: () => {
        logout();
        toggleNav();
      },
    },
  ];
  return (
    <div>
      {user ? (
        <IconButton onClick={toggleNav}>
          <Menu fontSize="large" color="primary" />
        </IconButton>
      ) : null}

      <Drawer
        width={drawerWidth}
        variant="temporary"
        open={navOpen}
        onClose={toggleNav}
        anchor="left"
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: "block",
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <Toolbar />
        <Stack>
          {nav.map((link) => (
            <div key={link.text}>
              <Divider />
              <CssBaseline />
              <Button sx={navLinkStyles} onClick={link.action}>
                {link.text}
              </Button>
            </div>
          ))}
        </Stack>
      </Drawer>
      {children}
    </div>
  );
};
export default Navbar;
