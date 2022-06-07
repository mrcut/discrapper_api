import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../api/api-user";

const UserDetail = () => {
  const [user, setUser] = useState({});

  let { paramId } = useParams();

  useEffect(() => {
    getUserById(paramId).then((response) => {
      const data = response.data;
      setUser((actual) => data);
    });
  }, [paramId]);

  return (
    <div className="row">
      <div className="col-8">
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-text">Id : {user.utilisateurId}</h5>
                <p className="card-title">Email : {user.utilisateurEmail}</p>
                <p className="card-text">Nom : {user.utilisateurNom}</p>
                <p className="card-text">Prenom :{user.utilisateurPrenom}</p>
                <p className="card-text">Tel : {user.utilisateurTel}</p>
                <p className="card-text">Discord : {user.utilisateurDiscord}</p>
                <p className="card-text">Role : {user.utilisateurRole}</p>
                <p className="card-text">
                  Date d'Inscription : {user.utilisateurDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
