import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

import {
  navbarAdmin,
  navbarEmploye,
  navbarUser,
  settingsAdmin,
  settingsEmploye,
} from "./NavbarConst";

import { useEffect, useState } from "react";

import { styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { executeScript } from "../api/api-user";
import { dc, execScript, Logo } from "../constantes";

const Header = styled(AppBar)`
  background: #111111;
`;

const Navbar = ({ user, logout }) => {
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item.label === execScript) {
      handleScript();
    }
    if (item.label === dc) {
      logout();
      navigate("/");
    } else {
      navigate(item.route);
    }
    setAnchorElUser(null);
  };

  const handleScript = () => {
    executeScript()
      .then((response) => {
        const script = response.data;
        alert(script);
      })
      .catch((err) => {
        const message = err.response.data.message;
        alert(message);
      });
  };

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [nav, setNav] = useState(navbarUser);
  const [menu, setMenu] = useState(settingsEmploye);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    if (user && user.role === "admin") {
      setNav((actual) => navbarAdmin);
      setMenu((actual) => settingsAdmin);
    }
    if (user && user.role === "employe") {
      setNav((actual) => navbarEmploye);
      setMenu((actual) => settingsEmploye);
    }
    if (user && user.role === "user") {
      setNav((actual) => navbarUser);
      setMenu((actual) => settingsEmploye);
    }

    if (!user) {
      setNav((actual) => navbarUser);
    }
  }, [[user]]);

  return (
    <Header position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Discrapper
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {nav.map((item) => (
                <MenuItem key={item.id} onClick={() => handleClick(item)}>
                  <Typography textAlign="center">
                    {item.icon}
                    {item.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Discrapper
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {nav.map((item) => (
              <Button
                key={item.id}
                onClick={() => handleClick(item)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {item.icon}
                {item.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user ? (
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                ) : null}
              </IconButton>
            </Tooltip>
            {/* ) : null} */}
            <Menu
              sx={{ mt: "40px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {menu.map((item) => (
                <MenuItem key={item.id} onClick={() => handleClick(item)}>
                  <Typography textAlign="center">
                    {item.icon}
                    {item.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </Header>
  );
};

export default Navbar;
