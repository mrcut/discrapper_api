import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteUser, getAllUsers } from "../api/api-user";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Visibility, Delete, Refresh } from "@mui/icons-material";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then((response) => {
        const data = response.data;
        setUsers((actual) => data);
        console.log(data);
      })
      .catch((err) => {
        const error = err.response.data.error;
        console.log(error);
      });
  }, []);

  // const handleDelete = () => {
  //   deleteUser()
  //     .then((response) => {
  //       console.log("ok");
  //     })
  //     .catch((err) => {
  //       const user = err.response.data.user;
  //       console.log(user);
  //     });
  // };

  const handleDelete = (id) => {
    deleteUser(id)
      .then((response) => {
        console.log("ok");
        // rajouter confirmation

        const usersTmp = users.filter((user) => user.utilisateurId !== id);
        setUsers((actual) => usersTmp);
      })
      .catch((err) => {
        const user = err.response.data.user;
        console.log(user);
        console.log(id);
      });
  };

  return (
    <Container sx={{ p: 7 }} maxWidth="lg">
      <Paper sx={{ p: 4 }}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              USERS
            </Typography>
          </Box>
          <Box>
            <Link to="/user/create">
              <Button variant="contained" color="primary">
                CREATE
              </Button>
            </Link>
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell>Prenom</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={"user" + user.utilisateurId}>
                  <TableCell>
                    <Link to={"/user/" + user.utilisateurId}>
                      {user.utilisateurEmail}
                    </Link>
                  </TableCell>
                  <TableCell>{user.utilisateurNom}</TableCell>
                  <TableCell>{user.utilisateurPrenom}</TableCell>
                  <TableCell align="center">
                    <ButtonGroup>
                      <Button
                        endIcon={<Visibility />}
                        href={"/user/" + user.utilisateurId}
                        variant="contained"
                      >
                        Details
                      </Button>
                      <Button
                        href={"/user/update/" + user.utilisateurId}
                        variant="contained"
                        endIcon={<Refresh />}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleDelete(user.utilisateurId)}
                        color="error"
                        endIcon={<Delete />}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default UserList;
