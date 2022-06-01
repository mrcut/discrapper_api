import { useParams } from "react-router-dom";
import { userKey } from "../constantes";

const Logout = ({ user, setUser }) => {
  const nav = useParams();

  //   localStorage.removeItem(userKey);
  //   setUser((actual) => null)  ;

  console.log("logout");

  //   nav("/login");
};

export default Logout;
