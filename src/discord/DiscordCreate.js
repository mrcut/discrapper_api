import { useState } from "react";
import {
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import { createDiscord } from "../api/api-discord";

const discordInput = {
  discordNom: "",
  discordLien: "",
  discordChannel: "",
};

const DiscordCreate = () => {
  const [discordForm, setDiscordForm] = useState({ ...discordInput });

  const [message, setMessage] = useState("");

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
        // const message = err.response.data.message;
        setMessage((actual) => err.response.data.message);
      });
  };

  return (
    <Container sx={{ p: 5 }} maxWidth="sm">
      <div>
        <Typography component="h1" variant="h5">
          Create a New Discord
        </Typography>
        <form onSubmit={handleSubmit}>
          {message ? <p className="text-danger">{message}</p> : null}
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
          </Grid>
        </form>

        <Link href="/discords">Back to List</Link>
      </div>
    </Container>
  );
};

export default DiscordCreate;
