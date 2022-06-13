import { Delete, Visibility } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteMessage,
  getAllCategories,
  getMessages,
} from "../api/api-messages";
import MessageByCategorie from "./MessageByCategorie";

const MessagesList = () => {
  const [messages, setMessages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [idCategorie, setIdCategorie] = useState(0);

  const handleCategorie = (id) => {
    setIdCategorie((actual) => id);
  };

  useEffect(() => {
    getAllCategories()
      .then((response) => {
        setCategories((actual) => response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  useEffect(() => {
    getMessages()
      .then((response) => {
        const result = response.data;
        setMessages((actual) => result);
        console.log(idCategorie);
        console.log(result);
      })
      .catch((err) => {
        const error = err.response.data.error;
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    deleteMessage(id)
      .then((response) => {
        console.log("ok");

        const msgTmp = messages.filter((message) => message.messageId !== id);
        setMessages((actual) => msgTmp);
      })
      .catch((err) => {
        const error = err.response.data.error;
        console.log(error);
        console.log(id);
      });
  };

  return (
    <Container
      disableGutters
      maxWidth="sm"
      component="main"
      sx={{ pt: 8, pb: 6 }}
    >
      <Paper sx={{ p: 4 }}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              Messages
            </Typography>
          </Box>
          <div>
            <Chip
              label="ALL"
              color="primary"
              onClick={() => handleCategorie(0)}
            />
            {categories.map((categorie) => (
              <Chip
                key={categorie.categorieId}
                color={categorie.categorieId % 2 ? "primary" : "success"}
                onClick={() => handleCategorie(categorie.categorieId)}
                label={categorie.categorieNom}
              />
            ))}
          </div>
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Message</TableCell>
                <TableCell>Catégorie</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {idCategorie !== 0 ? (
                <MessageByCategorie id={idCategorie} />
              ) : (
                <>
                  {messages.map((message) => (
                    <TableRow key={"msg" + message.messageId}>
                      <TableCell>
                        <Link to={"/message/" + message.messageId}>
                          {message.messageContent}
                        </Link>
                      </TableCell>
                      <TableCell>{message.categorieId.categorieNom}</TableCell>

                      <TableCell align="center">
                        <ButtonGroup>
                          <Button
                            endIcon={<Visibility />}
                            href={"/message/" + message.messageId}
                            variant="contained"
                          >
                            Details
                          </Button>

                          <Button
                            variant="contained"
                            onClick={() => handleDelete(message.messageId)}
                            color="error"
                            endIcon={<Delete />}
                          >
                            Delete
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default MessagesList;
