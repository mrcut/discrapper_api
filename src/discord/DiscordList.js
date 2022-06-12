import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteDiscord, getAllDiscords } from "../api/api-discord";
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

const DiscordList = () => {
  const [liste, setListe] = useState([]);

  useEffect(() => {
    getAllDiscords()
      .then((response) => {
        const discords = response.data;
        setListe((actual) => discords);
        console.log(discords);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  const handleDelete = (id) => {
    deleteDiscord(id)
      .then((response) => {
        console.log("ok");
        // rajouter confirmation

        const discordTmp = liste.filter((discord) => discord.discordId !== id);
        setListe((actual) => discordTmp);
      })
      .catch((err) => {
        const error = err.response.data.error;
        console.log(error);
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
              LISTE DES DISCORDS
            </Typography>
          </Box>
          <Box>
            <Link to="/discord/create">
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
                <TableCell>Nom</TableCell>
                <TableCell>Lien</TableCell>
                <TableCell>Channel</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {liste.map((discord) => (
                <TableRow key={"discord" + discord.discordId}>
                  <TableCell>
                    <Link to={"/discord/" + discord.discordId}>
                      {discord.discordNom}
                    </Link>
                  </TableCell>
                  <TableCell>{discord.discordLien}</TableCell>
                  <TableCell>{discord.discordChannel}</TableCell>
                  <TableCell align="center">
                    <ButtonGroup>
                      <Button
                        endIcon={<Visibility />}
                        href={"/discord/" + discord.discordId}
                        variant="contained"
                      >
                        Details
                      </Button>
                      <Button
                        href={"/discord/update/" + discord.discordId}
                        variant="contained"
                        endIcon={<Refresh />}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleDelete(discord.discordId)}
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

export default DiscordList;
