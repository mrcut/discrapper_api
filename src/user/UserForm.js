import { useState } from "react";
import { createUser } from "../api/api-user";

const userInput = {
  email: "",
  mdp: "",
  nom: "",
  prenom: "",
  tel: "",
  discord: "",
  role: "",
};

const UserForm = ({ activerResume }) => {
  const [userForm, setUserFrom] = useState({ ...userInput });

  const [message, setMessage] = useState("");

  const handleFocus = () => {
    if (message) {
      setMessage((actuel) => "");
    }
  };

  const handleChange = (e) => {
    setUserFrom((actual) => {
      return { ...actual, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleClick = () => {
    createUser(userForm)
      .then((response) => {
        const user = response.data;
        console.log(user);
        activerResume();
      })
      .catch((err) => {
        setMessage((actual) => err.response.data.message);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="col-4 offset-md-4">
          <form className="bg-light p-5" onSubmit={handleSubmit}>
            {message ? <p className="text-danger">{message}</p> : null}
            <h4 className="text-center"> Infos Utilisateur </h4>

            <div className="mb-3">
              <label className="form-label" required>
                EMAIL
              </label>
              <input
                type="text"
                name="email"
                value={userForm.email}
                onChange={handleChange}
                onFocus={handleFocus}
                className="form-control"
                id="email"
              />
            </div>

            <div className="mb-3">
              <label className="form-label" required>
                PASSWORD
              </label>
              <input
                type="password"
                name="password"
                value={userForm.password}
                onChange={handleChange}
                onFocus={handleFocus}
                className="form-control"
                id="password"
                autoComplete="password"
              />
            </div>

            <div className="mb-3">
              <label className="form-label" required>
                LAST NAME
              </label>
              <input
                type="text"
                name="nom"
                value={userForm.nom}
                onChange={handleChange}
                onFocus={handleFocus}
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
                onFocus={handleFocus}
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
                onFocus={handleFocus}
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
                onFocus={handleFocus}
                className="form-control"
                id="discordName"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">ROLE</label>
              <input
                type="text"
                name="role"
                value={userForm.role}
                onChange={handleChange}
                onFocus={handleFocus}
                className="form-control"
                id="role"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary mt-3"
              onClick={handleClick}
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
