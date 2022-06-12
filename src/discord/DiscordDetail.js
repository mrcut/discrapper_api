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
import { getDiscordById } from "../api/api-discord";

const DiscordDetail = () => {
  const [discord, setDiscord] = useState({});

  let { paramId } = useParams();

  useEffect(() => {
    getDiscordById(paramId)
      .then((response) => {
        const data = response.data;
        setDiscord((actual) => data);
      })
      .catch((err) => {
        const error = err.response.data.error;
        console.log(error);
      });
  }, [paramId]);

  return (
    <Container sx={{ p: 7 }} maxWidth="lg">
      {discord ? (
        <Paper sx={{ p: 4 }}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                DISCORD DETAIL
              </Typography>
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>NOM</TableCell>
                  <TableCell>CHANNEL</TableCell>
                  <TableCell>LIEN</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{discord.discordId}</TableCell>
                  <TableCell>{discord.discordNom}</TableCell>
                  <TableCell>{discord.discordChannel}</TableCell>
                  <TableCell>{discord.discordLien}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : null}
    </Container>
  );
};

export default DiscordDetail;
