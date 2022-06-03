import { useEffect, useState } from "react";
import Header from "./components/Header";
import MenuAppBar from "./components/Header";
import Navbar from "./components/Navbar";
import RoutesCustom from "./components/RoutesCustom";
import { getUserFromLocalStorage, userKey } from "./constantes";

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

  return (
    <div className="App">
      {/* <Navbar user={user} setUser={setUser} /> */}
      <Header />
      <RoutesCustom user={user} setUser={setUser} />
    </div>
  );
}

export default App;
