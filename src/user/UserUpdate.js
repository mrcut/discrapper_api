import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { getUserById, updateUser } from "../api/api-user";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router-dom";
import { KeyboardBackspace } from "@mui/icons-material";

let userInput = {
  email: "",
  nom: "",
  prenom: "",
  tel: "",
  discord: "",
  role: "",
};

const UserUpdate = () => {
  let { paramId } = useParams();

  const [userForm, setUserForm] = useState({ ...userInput });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getUserById(paramId)
      .then((response) => {
        const data = response.data;
        console.log(data);

        setUserForm((actual) => {
          return {
            email: data.utilisateurEmail,
            nom: data.utilisateurNom,
            prenom: data.utilisateurPrenom,
            tel: data.utilisateurTel,
            discord: data.utilisateurDiscord,
            role: data.utilisateurRole,
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
    setUserForm((actual) => {
      return { ...actual, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleClick = () => {
    updateUser(paramId, userForm)
      .then((response) => {
        const user = response.data;
        console.log(user);
        setMessage((actual) => "L'Utilisateur a bien été mis à jour");
      })
      .catch((err) => {
        setError((actual) => err.response.data.message);
        console.log("error");
        console.log(userForm);
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
        Update a User
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
              id="email"
              label="Email"
              value={userForm.email}
              variant="outlined"
              name="email"
              autoComplete="email"
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
              value={userForm.nom}
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
              value={userForm.prenom}
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
              value={userForm.tel}
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
              value={userForm.discord}
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
              value={userForm.role}
              onChange={handleChange}
              onFocus={handleFocus}
              fullWidth
              color="primary"
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

export default UserUpdate;
