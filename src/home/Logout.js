import { userKey } from "../constantes";

const Logout = ({ user, setUser }) => {
  localStorage.removeItem(userKey);
  setUser((actual) => null);
};

export default Logout;
