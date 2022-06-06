import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { login } from "../api/api-user";
import { useRef, useState } from "react";
import { userKey } from "../constantes";

const theme = createTheme();

const Login = ({ setCurrentUser }) => {
  const [erreur, setErreur] = useState(false);
  const emailInput = useRef();
  const mdpInput = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleClick = () => {
    setErreur((actual) => false);
    const inputs = {
      email: emailInput.current.value,
      password: mdpInput.current.value,
    };
    login(inputs)
      .then((response) => {
        const user = response.data;
        localStorage.setItem(userKey, JSON.stringify(user));
        setCurrentUser((actual) => user);
      })
      .catch((error) => {
        setErreur((actual) => true);
        console.log(inputs);
        console.log(emailInput);
        console.log(mdpInput);
      });
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

  const handleFocus = () => {
    setErreur((acutal) => false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {erreur ? "Erreur sur le Login" : null}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              inputRef={emailInput}
              autoFocus
              onFocus={handleFocus}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de Passe"
              type="password"
              id="password"
              inputRef={mdpInput}
              autoComplete="current-password"
              onFocus={handleFocus}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember Me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleClick}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs alignItems="center">
                <Link href="#" variant="body2">
                  Mot de passe oublié?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
