import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllUsers } from "../api/api-user";

const UserList = () => {
  const [liste, setListe] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then((response) => {
        const users = response.data;
        setListe((actual) => users);
        console.log(users);
      })
      .catch((err) => {
        const user = err.response.data.user;
        console.log(user);
      });
  }, []);

  return (
    <div>
      <h1>Liste des Utilisateurs</h1>
      <ul className="ul-menu">
        {liste.map((user) => (
          <li key={user.utilisateurId} className="li-button">
            <div>
              <p className="card-title">
                <Link to={"/user/" + user.utilisateurId}>
                  {user.utilisateurEmail}
                </Link>
              </p>
              <p>{user.utilisateurNom}</p>
              <p>{user.utilisateurPrenom}</p>
              <p>{user.utilisateurTel}</p>
              <p>{user.utilisateurDiscord}</p>
              <p>{user.utilisateurRole}</p>
              <p>{user.utilisateurDate}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
