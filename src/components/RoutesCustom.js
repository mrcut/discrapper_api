import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "../home/Home";
import FAQ from "../home/FAQ";
import Login from "../home/Login";
import UserList from "../user/UserList";
import UserDetail from "../user/UserDetail";
import UserCreate from "../user/UserCreate";
import UserProfile from "../user/UserProfile";
import MessageList from "../messages/MessagesList";
import MessageDetail from "../messages/MessageDetail";
import DiscordList from "../discord/DiscordList";
import DiscordCreate from "../discord/DiscordCreate";
import DiscordDetail from "../discord/DiscordDetail";
import DiscordUpdate from "../discord/DiscordUpdate";
import { useEffect } from "react";
import { getUserFromLocalStorage } from "../constantes";
import Statistiques from "../stats/Statistiques";
import NotFound from "./NotFound";
import UserUpdate from "../user/UserUpdate";

const RoutesCustom = ({ user, setUser, logout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInStorage = getUserFromLocalStorage();
    if (userInStorage) {
      setUser((actual) => userInStorage);
    } else {
      navigate("/");
    }
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? (
            <Home currentUser={user} />
          ) : (
            <Login setCurrentUser={setUser} />
          )
        }
      />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/stats" element={<Statistiques />} />
      <Route path="/users" element={<UserList />} />
      <Route path="/user/:paramId" element={<UserDetail />} />
      <Route path="/user/create" element={<UserCreate />} />
      <Route path="/user/update/:paramId" element={<UserUpdate />} />
      <Route path="/user/profile" element={<UserProfile />} />
      <Route path="/messages" element={<MessageList />} />
      <Route path="/message/:paramId" element={<MessageDetail />} />
      <Route path="/discords" element={<DiscordList />} />
      <Route path="/discord/:paramId" element={<DiscordDetail />} />
      <Route path="/discord/create" element={<DiscordCreate />} />
      <Route path="/discord/update/:paramId" element={<DiscordUpdate />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesCustom;
