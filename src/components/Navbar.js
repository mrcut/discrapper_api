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
  navbarEmploye,
  navbarUser,
  settings,
  settingsAdmin,
} from "./NavbarConst";

import { useEffect, useState } from "react";

import YourLogo from "../assets/Discrapper.svg";
import { Icon, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { executeScript } from "../api/api-user";
import { dc, execScript } from "../constantes";

export const Logo = () => (
  <Icon>
    <img alt="logo" src={YourLogo} height={25} width={25} />
  </Icon>
);

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
  };

  const handleScript = () => {
    executeScript()
      .then((response) => {
        const script = response.data;
        alert(script);
        console.log(script);
      })
      .catch((err) => {
        const message = err.response.data.message;
        alert(message);
      });
  };

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [nav, setNav] = useState(navbarUser);
  const [menu, setMenu] = useState(settings);

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
    if (user && (user.role === "admin" || user.role === "employe")) {
      setNav((actual) => navbarEmploye);
      setMenu((actual) => settingsAdmin);
    }
    if (user === null) {
      setNav(navbarUser);
      setMenu(settings);
    }
  }, [user]);

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
              size="large"
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
              {nav.map((item, index) => (
                <MenuItem key={item.id} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    {item.icon}
                    {item.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
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
            {nav.map((item, index) => (
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
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
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
              {menu.map((item, index) => (
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
