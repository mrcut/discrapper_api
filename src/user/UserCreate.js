import { useState } from "react";
import {
  Container,
  Link,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { createUser } from "../api/api-user";

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

  const paperStyle = { padding: "50px 20px ", width: 600, margin: "20px auto" };

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
        const user = response.data;
        console.log(user);
      })
      .catch((err) => {
        setMessage((actual) => err.response.data.message);
        console.log(userForm);
        console.log(role);
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
    <div>
      <Typography
        align="center"
        variant="h3"
        children="Créer un nouveau Utilisateur"
      />
      <Container>
        <Paper elevation={3} style={paperStyle}>
          <form className="bg-light p-5" onSubmit={handleSubmit}>
            {message ? <p className="text-danger">{message}</p> : null}
            <h1 style={{ color: "blue" }}>
              <u>Infos Utilisateur </u>
            </h1>

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

            <TextField
              id="tel"
              name="tel"
              label="PHONE NUMBER"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              onFocus={handleFocus}
            />

            <TextField
              id="discord"
              name="discord"
              label="DISCORD NICKNAME"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              onFocus={handleFocus}
            />

            {/* <TextField
                name="role"
                id="role"
                label="Role"
                variant="outlined"
                fullWidth
                onChange={handleChange}
                onFocus={handleFocus}
              /> */}
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

            <button
              type="submit"
              className="btn btn-primary mt-3"
              onClick={handleClick}
            >
              Envoyer
            </button>
          </form>
        </Paper>
      </Container>
      <Link href="/users">Back to List</Link>
    </div>
  );
};

export default UserCreate;
