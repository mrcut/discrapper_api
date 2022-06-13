import {
  Alert,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { editProfile } from "../api/api-user";
import { getUserFromLocalStorage } from "../constantes";
import SendIcon from "@mui/icons-material/Send";

const UserProfile = ({ setCurrentUser }) => {
  const [userForm, setUserFrom] = useState({
    nom: "",
    prenom: "",
    discord: "",
    tel: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFocus = () => {
    if (message) {
      setMessage((actuel) => "");
    }
  };

  useEffect(() => {
    const user = getUserFromLocalStorage();
    setUserFrom((actual) => {
      return {
        nom: user.nom,
        prenom: user.prenom,
        discord: user.discord,
        tel: user.tel,
      };
    });
  }, []);

  const handleChange = (e) => {
    setUserFrom((actual) => {
      return { ...actual, [e.target.name]: e.target.value };
    });
  };

  const handleClick = () => {
    editProfile(userForm)
      .then((response) => {
        const profile = response.data;
        console.log(profile);
        let user = getUserFromLocalStorage();
        user = {
          ...user,
          nom: userForm.nom,
          prenom: userForm.prenom,
          discord: userForm.discord,
          tel: userForm.tel,
        };
        localStorage.setItem("user", JSON.stringify(user));

        setCurrentUser((actual) => user);
        setMessage((actual) => "Changements effectués");
        console.log("errroor");
      })
      .catch((err) => {
        const msg = err.response.data.msg;
        console.log(msg);
        console.log("errr");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container sx={{ p: 5 }} maxWidth="sm">
      <Typography component="h1" variant="h5">
        Mes Infos
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
    </Container>
  );
};

export default UserProfile;
