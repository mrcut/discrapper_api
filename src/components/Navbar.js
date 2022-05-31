import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { executeScript } from "../api/api-user";
import { getUserFromLocalStorage, userKey } from "../constantes";

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
    <nav>
      <Link to={"/"}>Home</Link>
      <Link to={"/faq"}>FAQ</Link>
      <Link to={"/contact"}>Contact</Link>
      {user ? (
        <>
          <Link to={"/messages"}>Messages</Link>
          <Link to={"/stats"}>Statistiques</Link>

          {user.role === "admin" ? (
            <>
              <Link to={"/discords"}>Discords</Link>
            </>
          ) : null}
          <Link to={"/"} onClick={logout}>
            Logout
          </Link>
        </>
      ) : null}
    </nav>
  );
};
export default Navbar;
