import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Button, Icon } from "@mui/material";
import { Link } from "react-router-dom";
import { getUserFromLocalStorage, userKey } from "../constantes";
import { useEffect, useState } from "react";
import { executeScript } from "../api/api-user";

const svgIcon = (
  <Icon>
    <img alt="Discord" src="discord.png" height="25" width="20" />
  </Icon>
);

const Navbar = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const userInStorage = getUserFromLocalStorage();
    if (userInStorage) {
      setUser((actual) => userInStorage);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem(userKey);
    setUser((actual) => null);
  };

  const handleClick = () => {
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

  return (
    <Tabs>
      <Tab>
        <Link to={"/"}>HOME</Link>
      </Tab>

      <ul>
        <li>
          <Link to={"/"}>FAQ</Link>
        </li>
        <li>
          <Link to={"/"}>CONTACT</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to={"/messages"}>MESSAGES</Link>
            </li>

            <li>
              <Link to={"/"}>STATISTIQUES</Link>
            </li>
            {user.role === "admin" ? (
              <>
                <li>
                  <Link to={"/discords"}>LISTE DES DISCORD</Link>
                </li>

                <li>
                  <Link to={"/users"}>LISTE DES UTILISATEURS</Link>
                </li>

                <li>
                  <Link to={"/discord/create"}>AJOUTER UN DISCORD</Link>
                </li>
                <li>
                  <Link to={"/user/create"}>AJOUTER UN UTILISATEUR</Link>
                </li>
                <Button
                  variant="contained"
                  onClick={handleClick}
                  startIcon={svgIcon}
                  color="primary"
                >
                  EXECUTER LE SCRIPT
                </Button>
              </>
            ) : null}

            <li>
              <Link to={"/"} onClick={logout}>
                LOGOUT
              </Link>
            </li>

            <li>
              <Link to={"/user/profile"}>MON COMPTE</Link>
            </li>
          </>
        ) : null}
      </ul>
    </Tabs>
  );
};

export default Navbar;
