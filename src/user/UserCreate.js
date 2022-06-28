import { useState } from "react";
import {
  Alert,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { createUser } from "../api/api-user";
import SendIcon from "@mui/icons-material/Send";
import { KeyboardBackspace } from "@mui/icons-material";

const userInput = {
  email: "",
  mdp: "",
  nom: "",
  prenom: "",
  tel: "",
  discord: "",
  role: "",
};

const UserCreate = () => {
  const [userForm, setUserFrom] = useState({ ...userInput });

  const [message, setMessage] = useState("");
  const [error, setError] = useState({});

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
        setMessage((actual) => "L'Utilisateur a bien été ajouté");
      })
      .catch((err) => {
        const message = err.response.data.message;
        setError((actual) => JSON.parse(message));
      });
  };

  const roles = [
    {
      value: "user",
      label: "USER",
      name: "user",
    },
    {
      value: "employe",
      label: "EMPLOYE",
      name: "employe",
    },
    { value: "admin", label: "ADMIN", name: "admin" },
  ];

  return (
    <Container sx={{ p: 5 }} maxWidth="sm">
      <Typography component="h1" variant="h5">
        Create a New User
      </Typography>
      <form onSubmit={handleSubmit}>
        {message && <Alert severity="success">{message}</Alert>}
        <Grid container sx={{ pt: 5 }} spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="email"
              label="Email"
              variant="outlined"
              name="email"
              autoComplete="email"
              fullWidth
              onChange={handleChange}
              onFocus={handleFocus}
            />
            {error.erEmail && <Alert severity="error">{error.erEmail}</Alert>}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="mdp"
              name="mdp"
              label="Password"
              type="password"
              variant="outlined"
              autoComplete="mdp"
              fullWidth
              onChange={handleChange}
              onFocus={handleFocus}
            />
            {error.erMdp && <Alert severity="error">{error.erMdp}</Alert>}
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="nom"
              name="nom"
              label="LAST NAME"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              onFocus={handleFocus}
            />
            {error.erNom && <Alert severity="error">{error.erNom}</Alert>}
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="prenom"
              name="prenom"
              label="FIRST NAME"
              variant="outlined"
              onChange={handleChange}
              onFocus={handleFocus}
              fullWidth
            />
            {error.erPrenom && <Alert severity="error">{error.erPrenom}</Alert>}
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="tel"
              name="tel"
              label="PHONE NUMBER"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              onFocus={handleFocus}
            />
            {error.erTel && <Alert severity="error">{error.erTel}</Alert>}
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="discord"
              name="discord"
              label="DISCORD NICKNAME"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              onFocus={handleFocus}
            />
            {error.erDiscord && (
              <Alert severity="error">{error.erDiscord}</Alert>
            )}
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="role"
              id="role"
              select
              label="Role"
              onChange={handleChange}
              onFocus={handleFocus}
              fullWidth
            >
              {roles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
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
            <Button startIcon={<KeyboardBackspace />} href="/users">
              Back to List
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default UserCreate;
