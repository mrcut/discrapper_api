import { useEffect, useState } from "react";
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
      <Navbar user={user} setUser={setUser} />
      <RoutesCustom user={user} setUser={setUser} />
    </div>
  );
}

export default App;
