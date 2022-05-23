import { useRef, useState } from "react";
import { login } from "../api/api-user";
import { userKey } from "../constantes";

const Login = ({ setCurrentUser }) => {
  const [erreur, setErreur] = useState(false);
  const emailInput = useRef(null);
  const mdpInput = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleClick = () => {
    setErreur((actual) => false);
    const inputs = {
      email: emailInput.current.value,
      password: mdpInput.current.value,
    };
    login(inputs)
      .then((response) => {
        const user = response.data;
        localStorage.setItem(userKey, JSON.stringify(user));
        setCurrentUser((actual) => user);
      })
      .catch((error) => {
        setErreur((actual) => true);
      });
  };

  const handleFocus = () => {
    setErreur((acutal) => false);
  };

  return (
    <div className="row">
      <div className="col-4 offset-md-4">
        <form className="bg-light p-5" onSubmit={handleSubmit}>
          <h4>Connexion</h4>
          <div className="text-danger mb-3">
            {erreur ? "Erreur sur le Login" : null}
          </div>
          <div className="mb-3">
            <label htmlFor="pk" className="form-label">
              E-MAIL
            </label>
            <input
              onFocus={handleFocus}
              type="email"
              ref={emailInput}
              className="form-control"
              id="pk"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password1" className="form-label" required>
              MOT DE PASSE
            </label>
            <input
              onFocus={handleFocus}
              type="password"
              className="form-control"
              id="password1"
              autoComplete="on"
              ref={mdpInput}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Connexion
          </button>

          <div className="modal-footer">
            <div className="forgot login-footer">
              {" "}
              <a href="/">Mot de passe oublié ?</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
