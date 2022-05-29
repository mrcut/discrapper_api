import { useState } from "react";
import { updateDiscord } from "../api/api-discord";

const DiscordUpdate = ({ discordNom, discordLien, discordChannel }) => {
  const discordInput = {
    discordNom: discordNom,
    discordLien: discordLien,
    discordChannel: discordChannel,
  };

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
    updateDiscord(discordForm)
      .then((response) => {
        const discord = response.data;
        console.log(discord);
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
            <h4> Update Discord</h4>

            <div className="mb-3">
              <label className="form-label">DISCORD NAME</label>
              <input
                type="text"
                name="discordNom"
                value={discordForm.discordNom}
                onChange={handleChange}
                onFocus={handleFocus}
                className="form-control"
                id="discordNom"
              />
            </div>

            <div className="mb-3">
              <label className="form-label" required>
                DISCORD LINK
              </label>
              <input
                type="text"
                name="discordLien"
                value={discordForm.discordLien}
                onChange={handleChange}
                onFocus={handleFocus}
                className="form-control"
                id="discordLien"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">DISCORD CHANNEL</label>
              <input
                type="text"
                name="discordChannel"
                value={discordForm.discordChannel}
                onChange={handleChange}
                onFocus={handleFocus}
                className="form-control"
                id="discordChannel"
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

export default DiscordUpdate;
