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
import { getMessageById } from "../api/api-messages";

const MessageDetail = () => {
  const [message, setMessage] = useState(null);

  let { paramId } = useParams();

  useEffect(() => {
    console.log("lancement du useEffect");
    getMessageById(paramId)
      .then((response) => {
        const data = response.data;
        console.log(data);
        setMessage((actual) => data);
      })
      .catch((err) => {
        const error = err.response.data.error;
        console.log(error);
      });
  }, [paramId]);

  return (
    <Container sx={{ p: 7 }} maxWidth="lg">
      {message ? (
        <Paper sx={{ p: 4 }}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                MESSAGE DETAIL
              </Typography>
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>CONTENU</TableCell>
                  <TableCell>CATEGORIE</TableCell>
                  <TableCell>DISCORD</TableCell>
                  <TableCell>CHANNEL</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{message.messageId}</TableCell>
                  <TableCell>{message.messageContent}</TableCell>
                  <TableCell>{message.categorieId.categorieNom}</TableCell>
                  <TableCell>{message.discordId.discordNom}</TableCell>
                  <TableCell>{message.discordId.discordChannel}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : null}
    </Container>
  );
};

export default MessageDetail;
