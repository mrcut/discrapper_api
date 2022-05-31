import { Route, Routes } from "react-router-dom";
import Home from "../home/Home";
import Contact from "../home/Contact";
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
import { useEffect, useState } from "react";
import { getUserFromLocalStorage } from "../constantes";
import Statistiques from "../stats/Statistiques";

const RoutesCustom = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const userInStorage = getUserFromLocalStorage();
    if (userInStorage) {
      setUser((actual) => userInStorage);
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
      <Route path="/contact" element={<Contact />} />
      <Route path="/stats" element={<Statistiques />} />
      <Route path="/users" element={<UserList />} />
      <Route path="/user/:paramId" element={<UserDetail />} />
      <Route path="/user/create" element={<UserCreate />} />
      <Route path="/user/profile" element={<UserProfile />} />
      <Route path="/messages" element={<MessageList />} />
      <Route path="/message/:paramId" element={<MessageDetail />} />
      <Route path="/discords" element={<DiscordList />} />
      <Route path="/discord/:paramId" element={<DiscordDetail />} />
      <Route path="/discord/create" element={<DiscordCreate />} />
      <Route path="/discord/update" element={<DiscordUpdate />} />
    </Routes>
  );
};

export default RoutesCustom;
