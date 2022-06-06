import { Link, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Button, Container, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDiscordById, updateDiscord } from "../api/api-discord";

const discordInput = {
  discordNom: "",
  discordLien: "",
  discordChannel: "",
};

const DiscordUpdate = () => {
  const [discordForm, setDiscordForm] = useState({ ...discordInput });

  const paperStyle = { padding: "50px 20px ", width: 600, margin: "20px auto" };

  const [message, setMessage] = useState("");

  let { paramId } = useParams();

  const handleFocus = () => {
    if (message) {
      setMessage((actuel) => "");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setDiscordForm((actual) => {
      return { ...actual, [e.target.name]: e.target.value };
    });
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

  useEffect(() => {
    getDiscordById(paramId).then((response) => {
      const data = response.data;
      setDiscordForm((actual) => data);
    }, []);
  });

  return (
    <div>
      <Typography align="center" variant="h3" children="Modifier un Discord" />
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

export default DiscordUpdate;
