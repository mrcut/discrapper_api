import { useState } from "react";
import {
  Alert,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import { createDiscord } from "../api/api-discord";
import { KeyboardBackspace } from "@mui/icons-material";

const discordInput = {
  discordNom: "",
  discordLien: "",
  discordChannel: "",
};

const DiscordCreate = () => {
  const [discordForm, setDiscordForm] = useState({ ...discordInput });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFocus = () => {
    if (message) {
      setMessage((actuel) => "");
    }
  };

  const handleChange = (e) => {
    setDiscordForm((actual) => {
      return { ...actual, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleClick = () => {
    createDiscord(discordForm)
      .then((response) => {
        const discord = response.data;
        console.log(discord);
        setMessage((actual) => "Ce Discord a bien été ajouté");
      })
      .catch((err) => {
        setError((actual) => err.response.data.message);
      });
  };

  return (
    <Container sx={{ p: 5 }} maxWidth="sm">
      <div>
        <Typography component="h1" variant="h5">
          Create a New Discord
        </Typography>
        <form onSubmit={handleSubmit}>
          {message ? (
            <Alert severity="success">{message}</Alert>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : null}

          <Grid container sx={{ pt: 5 }} spacing={3}>
            <Grid item xs={12}>
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
            </Grid>

            <Grid item xs={12}>
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
            </Grid>

            <Grid item xs={12}>
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
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleClick}
                fullWidth
              >
                Send
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button startIcon={<KeyboardBackspace />} href="/discords">
                Back to List
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default DiscordCreate;
