import * as React from "react";
import { useEffect, useState } from "react";

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";

import houseplant3 from "../../assets/appIcons/houseplant3.png";
import { Avatar } from "@mui/material";
import "./NavBar.css";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

export default function PrimarySearchAppBar() {
  const [user, setUser] = useState(false); //! <<< DONT FORGET
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }} className="nav-box">
      <AppBar position="fixed">
        {/* <Toolbar sx={{ backgroundColor: "teal" }}> */}
        {/* <Toolbar sx={{ backgroundColor: "#1b5e20" }}> */}
        {/* <Toolbar sx={{ backgroundColor: "#004d40" }}> */}
        {/* <Toolbar sx={{ backgroundColor: "#003838" }}> */}
        <Toolbar sx={{ backgroundColor: "#002A2A" }}>
          <div className="plant-logo-box">
            <img src={houseplant3} className="plant-logo" alt="" />
          </div>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            color="inherit"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {!user ? (
              <MenuIcon
                className="menu-icon"
                sx={{ position: "fixed", right: "20px;" }}
              />
            ) : (
              <Avatar
                className="menu-icon"
                sx={{ position: "fixed", right: "20px;" }}
              />
            )}
          </IconButton>
          <React.Fragment>
            <Box
              className="hamburger-menu"
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            ></Box>
            <Menu
              sx={{
                top: "33px",
                left: "35vw",
              }}
              // sx={{ mt: 100 }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  position: "fixed",
                  // left: 200,
                  mt: 3.0,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "left", vertical: "top" }}
              anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
              className="hamburger-menu"
            >
              {user ? (
                <MenuItem>
                  <Avatar /> My account
                </MenuItem>
              ) : (
                <MenuItem>
                  <Avatar /> Not signed in
                </MenuItem>
              )}
              <Divider />
              {/* <MenuItem>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Add another account
              </MenuItem> */}
              <MenuItem>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              {user ? (
                <MenuItem>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              ) : (
                <MenuItem>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Sign in
                </MenuItem>
              )}
            </Menu>
          </React.Fragment>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
