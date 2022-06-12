import {
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
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../api/api-user";

const UserDetail = () => {
  const [user, setUser] = useState(null);

  let { paramId } = useParams();

  useEffect(() => {
    getUserById(paramId)
      .then((response) => {
        const data = response.data;
        setUser((actual) => data);
      })
      .catch((err) => {
        const error = err.response.data.error;
        console.log(error);
      });
  }, [paramId]);

  return (
    <Container sx={{ p: 7 }} maxWidth="lg">
      {user ? (
        <Paper sx={{ p: 4 }}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                USER DETAIL
              </Typography>
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>EMAIL</TableCell>
                  <TableCell>NOM</TableCell>
                  <TableCell>PRENOM</TableCell>
                  <TableCell>TEL</TableCell>
                  <TableCell>DISCORD</TableCell>
                  <TableCell>ROLE</TableCell>
                  <TableCell>DATE D'INSCRIPTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{user.utilisateurId}</TableCell>
                  <TableCell>{user.utilisateurEmail}</TableCell>
                  <TableCell>{user.utilisateurNom}</TableCell>
                  <TableCell>{user.utilisateurPrenom}</TableCell>
                  <TableCell> {user.utilisateurTel}</TableCell>
                  <TableCell> {user.utilisateurDiscord}</TableCell>
                  <TableCell>{user.utilisateurRole}</TableCell>
                  <TableCell>{user.utilisateurDate}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : null}
    </Container>
  );
};

export default UserDetail;
