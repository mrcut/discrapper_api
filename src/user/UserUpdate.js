import { useEffect, useState } from "react";
import { updateUser } from "../api/api-user";
import { getUserFromLocalStorage } from "../constantes";

const UserUpdate = ({ setCurrentUser }) => {
  const [userForm, setUserFrom] = useState({
    nom: "",
    prenom: "",
    discord: "",
    tel: "",
  });

  useEffect(() => {
    const user = getUserFromLocalStorage();
    setUserFrom((actual) => {
      return {
        nom: user.nom,
        prenom: user.prenom,
        discord: user.discord,
        tel: user.tel,
      };
    });
  }, []);

  const handleChange = (e) => {
    setUserFrom((actual) => {
      return { ...actual, [e.target.name]: e.target.value };
    });
  };

  const handleClick = () => {
    updateUser(userForm)
      .then((response) => {
        const emp = response.data;
        console.log(emp);
        let user = getUserFromLocalStorage();
        user = {
          ...user,
          nom: userForm.nom,
          prenom: userForm.prenom,
          tel: userForm.tel,
          discord: userForm.discord,
        };
        localStorage.setItem("user", JSON.stringify(user));
        setCurrentUser((actual) => user);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div>
      <h1 className="text-center"> Mes Infos </h1>
      <div className="col-5 offset-md-4">
        <div className="bg-light p-5">
          <div className="mb-3">
            <label className="form-label" required>
              LAST NAME
            </label>
            <input
              type="text"
              name="nom"
              value={userForm.nom}
              onChange={handleChange}
              className="form-control"
              id="nom"
            />
          </div>

          <div className="mb-3">
            <label className="form-label" required>
              FIRST NAME
            </label>
            <input
              type="text"
              name="prenom"
              value={userForm.prenom}
              onChange={handleChange}
              className="form-control"
              id="prenom"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">PHONE NUMBER</label>
            <input
              type="text"
              name="tel"
              value={userForm.tel}
              onChange={handleChange}
              className="form-control"
              id="tel"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">DISCORD NICKNAME</label>
            <input
              type="text"
              name="discord"
              value={userForm.discord}
              onChange={handleChange}
              className="form-control"
              id="discordName"
            />
          </div>
          <button className="btn btn-warning mt-3" onClick={handleClick}>
            Modifier
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserUpdate;
