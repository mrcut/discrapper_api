import { useState } from "react";
import { createDiscord } from "../api/api-user";

const discordInput = {
  name: "",
  link: "",
  channel: "",
};

const DiscordForm = ({ activerResume }) => {
  const [discordForm, setDiscordForm] = useState({ ...discordInput });

  const handleChange = (e) => {
    setDiscordForm((actual) => {
      return { ...actual, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [message, setMessage] = useState("");

  const handleFocus = () => {
    if (message) {
      setMessage((actuel) => "");
    }
  };

  const handleClick = () => {
    createDiscord(discordForm)
      .then((response) => {
        const discord = response.data;
        console.log(discord);
        activerResume();
      })
      .catch((err) => {
        // const message = err.response.data.message;
        setMessage((actual) => err.response.data.message);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="col-4 offset-md-4">
          <form className="bg-light p-5" onSubmit={handleSubmit}>
            {message ? <p className="text-danger">{message}</p> : null}
            <h4> Infos Discord</h4>

            <div className="mb-3">
              <label className="form-label">DISCORD NAME</label>
              <input
                type="text"
                name="name"
                value={discordForm.name}
                onChange={handleChange}
                onFocus={handleFocus}
                className="form-control"
                id="name"
              />
            </div>

            <div className="mb-3">
              <label className="form-label" required>
                DISCORD LINK
              </label>
              <input
                type="text"
                name="link"
                value={discordForm.link}
                onChange={handleChange}
                onFocus={handleFocus}
                className="form-control"
                id="link"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">DISCORD CHANNEL</label>
              <input
                type="text"
                name="channel"
                value={discordForm.channel}
                onChange={handleChange}
                onFocus={handleFocus}
                className="form-control"
                id="channel"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
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

export default DiscordForm;
