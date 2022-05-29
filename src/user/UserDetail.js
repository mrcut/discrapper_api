import { Button, ButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteUser, getUserById } from "../api/api-user";

const UserDetail = () => {
  const [user, setUser] = useState({});

  let { paramId } = useParams();

  const redirect = useNavigate();

  const handleDelete = () => {
    deleteUser(paramId)
      .then((response) => {
        redirect("/users");
      })
      .catch((err) => {
        const user = err.response.data.user;
        console.log(user);
      });
  };

  useEffect(() => {
    getUserById(paramId).then((response) => {
      const data = response.data;
      setUser((actual) => data);
    });
  }, []);

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
                <ButtonGroup>
                  <Button href="/discord/update" variant="contained">
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleDelete}
                    color="error"
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;