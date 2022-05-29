import { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { executeScript } from "./api/api-user";
import "./App.css";
import { getUserFromLocalStorage, userKey } from "./constantes";
import DiscordCreate from "./discord/DiscordCreate";
import Home from "./home/Home";
import Login from "./home/Login";
import MessageDetail from "./messages/MessageDetail";
import MessagesList from "./messages/MessagesList";
import UserCreate from "./user/UserCreate";
import { Button, Icon } from "@mui/material";
import DiscordList from "./discord/DiscordList";
import DiscordDetail from "./discord/DiscordDetail";
import DiscordUpdate from "./discord/DiscordUpdate";
import UserList from "./user/UserList";
import UserProfile from "./user/UserProfile";
import UserDetail from "./user/UserDetail";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const svgIcon = (
  <Icon>
    <img alt="Discord" src="discord.png" height="25" width="20" />
  </Icon>
);

function App() {
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
    <BrowserRouter>
      <Tabs>
        <div className="container-fluid">
          <Tab>
            <Link className="navbar-brand" to={"/"}>
              HOME
            </Link>
          </Tab>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to={"/"}>
                  FAQ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/"}>
                  CONTACT
                </Link>
              </li>
              {user ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/messages"}>
                      MESSAGES
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to={"/"}>
                      STATISTIQUES
                    </Link>
                  </li>
                  {user.role === "admin" ? (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link" to={"/discords"}>
                          LISTE DES DISCORD
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link className="nav-link" to={"/users"}>
                          LISTE DES UTILISATEURS
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link className="nav-link" to={"/discord/create"}>
                          AJOUTER UN DISCORD
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to={"/user/create"}>
                          AJOUTER UN UTILISATEUR
                        </Link>
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

                  <li className="nav-item">
                    <Link className="nav-link" to={"/"} onClick={logout}>
                      LOGOUT
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to={"/user/profile"}>
                      MON COMPTE
                    </Link>
                  </li>
                </>
              ) : null}
            </ul>
          </div>
        </div>
      </Tabs>

      <div className="container p-5 ">
        <Routes>
          <Route
            exact
            path="/"
            element={
              user ? (
                <Home currentUser={user} />
              ) : (
                <Login setCurrentUser={setUser} />
              )
            }
          ></Route>
          <Route exact path="/users" element={<UserList />}></Route>
          <Route exact path="/user/:paramId" element={<UserDetail />}></Route>
          <Route exact path="/discords" element={<DiscordList />}></Route>
          <Route
            exact
            path="/discord/create"
            element={<DiscordCreate />}
          ></Route>
          <Route exact path="/messages" element={<MessagesList />}></Route>

          <Route exact path="/user/create" element={<UserCreate />}></Route>
          <Route
            exact
            path="/message/:paramId"
            element={<MessageDetail />}
          ></Route>
          <Route
            exact
            path="discord/update"
            element={<DiscordUpdate />}
          ></Route>
          <Route
            exact
            path="discord/:paramId"
            element={<DiscordDetail />}
          ></Route>
          <Route exact path="/user/profile" element={<UserProfile />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
