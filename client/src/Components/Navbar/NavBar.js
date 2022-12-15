import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext.js";
import { LangContext } from "../../Contexts/LangContext.js";
import TranslatedContent from "../TranslatedContent";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Navigate, useNavigate } from "react-router-dom";
// import houseplant3 from "../../assets/appIcons/complexgold.png";
// import houseplant3 from "../../assets/appIcons/chrome.png";
import houseplant3 from "../../assets/appIcons/houseplant3.png";

import { Avatar } from "@mui/material";
import "./NavBar.css";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

export default function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const { getProfile, userLoggedIn, logout, isUser } = useContext(AuthContext);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuNav = (e) => {
    if (isUser) {
      logout(e);
    }
  };

  console.log("userLoggedIn.username", userLoggedIn.username);

  return (
    <Box position="fixed" sx={{ flexGrow: 1 }} className="nav-box">
      <AppBar position="fixed">
        <Toolbar sx={{ backgroundColor: "#002A2A" }}>
          <Link to={"/"}>
            <img src={houseplant3} className="plant-logo" alt="" />
          </Link>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            color="inherit"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MenuIcon
              className="menu-icon"
              sx={{ position: "fixed", right: "20px;" }}
            />
          </IconButton>
          <React.Fragment>
            <Box
              className="hamburger-menu"
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Menu
                sx={{
                  top: "50px",
                  left: "35vw",
                }}
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
                    mt: 3.0,
                    ml: 20.0,
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
                {isUser ? (
                  <MenuItem>
                    <Avatar />{" "}
                    {/* <Link to={"/myaccount"}>
                      {userLoggedIn.username}'s account
                    </Link> */}
                    <Link
                      to={`/profile/${userLoggedIn.username}`}
                      state={{ user: userLoggedIn.username }}
                    >
                      {userLoggedIn.username}'s{" "}
                      <TranslatedContent contentID="account" />
                    </Link>
                  </MenuItem>
                ) : (
                  <MenuItem>
                    <Avatar /> <TranslatedContent contentID="notSignedIn" />
                  </MenuItem>
                )}
                <Divider />

                {isUser ? (
                  <MenuItem onClick={handleMenuNav}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    <TranslatedContent contentID="logout" />
                  </MenuItem>
                ) : (
                  <MenuItem onClick={handleMenuNav("/signin")}>
                    <ListItemIcon>
                      <LoginIcon fontSize="small" />
                    </ListItemIcon>
                    <Link
                      to={"/login"}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <TranslatedContent contentID="signIn" />
                    </Link>
                  </MenuItem>
                )}
                {!isUser && (
                  <MenuItem>
                    <ListItemIcon>
                      <LoginIcon fontSize="small" />
                    </ListItemIcon>
                    <Link
                      to={"/signup"}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <TranslatedContent contentID="signUp" />
                    </Link>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </React.Fragment>
        </Toolbar>
      </AppBar>
      <div className="navbar-rim"></div>
    </Box>
  );
}
