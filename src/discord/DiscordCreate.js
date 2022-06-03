import { Link, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Button, Container, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { createDiscord } from "../api/api-discord";

const discordInput = {
  discordNom: "",
  discordLien: "",
  discordChannel: "",
};

const DiscordCreate = () => {
  const [discordForm, setDiscordForm] = useState({ ...discordInput });

  const paperStyle = { padding: "50px 20px ", width: 600, margin: "20px auto" };

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
      })
      .catch((err) => {
        // const message = err.response.data.message;
        setMessage((actual) => err.response.data.message);
      });
  };

  return (
    <div>
      <Typography
        align="center"
        variant="h3"
        children="Créer un nouveau Discord"
      />
      <Container>
        <Paper elevation={3} style={paperStyle}>
          <form className="bg-light p-5" onSubmit={handleSubmit}>
            {message ? <p className="text-danger">{message}</p> : null}
            <h1 style={{ color: "blue" }}>
              <u>Infos Discord</u>{" "}
            </h1>

            <TextField
              required
              name="discordNom"
              id="discordNom"
              label="Discord Name"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              onFocus={handleFocus}
            />

            <TextField
              required
              name="discordLien"
              id="discordLien"
              label="Discord Link"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              onFocus={handleFocus}
            />

            <TextField
              required
              name="discordChannel"
              id="discordChannel"
              label="Discord Channel"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              onFocus={handleFocus}
            />

            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleClick}
            >
              Send
            </Button>
          </form>
        </Paper>
      </Container>
      <Link href="/discords">Back to List</Link>
    </div>
  );
};

export default DiscordCreate;
