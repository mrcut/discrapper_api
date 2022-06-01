import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import RoutesCustom from "./components/RoutesCustom";
import { getUserFromLocalStorage } from "./constantes";

function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const userInStorage = getUserFromLocalStorage();
    if (userInStorage) {
      setUser((actual) => userInStorage);
    }
  }, []);

  return (
    <div className="App">
      <Navbar user={user} setUser={setUser} />
      <RoutesCustom user={user} setUser={setUser} />
    </div>
  );
}

export default App;
