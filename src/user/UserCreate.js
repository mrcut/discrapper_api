import { useState } from "react";
import {
  Button,
  Container,
  Grid,
  Link,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { createUser } from "../api/api-user";
import SendIcon from "@mui/icons-material/Send";

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

  const [role, setRole] = useState("user");

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

  const handleRole = (e) => {
    setRole(e.target.value);
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
        setMessage((actual) => err.response.data.message);
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
      <div>
        <Typography component="h1" variant="h5">
          Create a New User
        </Typography>
        <form onSubmit={handleSubmit}>
          {message ? <p className="text-danger">{message}</p> : null}
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
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="role"
                id="role"
                select
                label="Role"
                value={role}
                onChange={handleRole}
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
          </Grid>
        </form>

        <Link href="/users">Back to List</Link>
      </div>
    </Container>
  );
};

export default UserCreate;
