import { useEffect, useState } from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { getDiscordById, updateDiscord } from "../api/api-discord";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router-dom";
import { KeyboardBackspace } from "@mui/icons-material";

const discordInput = {
  discordNom: "",
  discordLien: "",
  discordChannel: "",
};

const DiscordUpdate = () => {
  let { paramId } = useParams();

  const [discordForm, setDiscordForm] = useState({ ...discordInput });

  const [message, setMessage] = useState("");

  useEffect(() => {
    getDiscordById(paramId)
      .then((response) => {
        const data = response.data;
        console.log(data);

        setDiscordForm((actual) => {
          return {
            discordNom: data.discordNom,
            discordLien: data.discordLien,
            discordChannel: data.discordChannel,
          };
        });
      })
      .catch((err) => {
        const error = err.response.data.error;
        console.log(error);
      });
  }, [paramId]);

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
    updateDiscord(paramId, discordForm)
      .then((response) => {
        const discord = response.data;
        console.log(discord);
      })
      .catch((err) => {
        setMessage((actual) => err.response.data.message);
        console.log("error");
        console.log(discordForm);
      });
  };

  return (
    <Container sx={{ p: 5 }} maxWidth="sm">
      <div>
        <Typography component="h1" variant="h5">
          Update a Discord
        </Typography>
        <form onSubmit={handleSubmit}>
          {message ? <p className="text-danger">{message}</p> : null}
          <Grid container sx={{ pt: 5 }} spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                value={discordForm.discordNom}
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
                value={discordForm.discordLien}
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
                value={discordForm.discordChannel}
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

export default DiscordUpdate;
