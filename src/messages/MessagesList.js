import {
  CurrencyBitcoin,
  Delete,
  Face,
  Favorite,
  Help,
  Public,
  Visibility,
} from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  Container,
  ListItem,
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
  const [liste, setListe] = useState([]);
  const [categorie, setCategorie] = useState([]);

  const [idCategorie, setIdCategorie] = useState(0);
  const [chipData, setChipData] = useState([]);

  useEffect(() => {
    getAllCategories()
      .then((response) => {
        setCategorie((actual) => response.data);
      })
      .catch((err) => {
        console.log(err.response.data.categorie);
      });
  }, []);

  useEffect(() => {
    getMessages()
      .then((response) => {
        const messages = response.data;
        setListe((actual) => messages);
        console.log(messages);
      })
      .catch((err) => {
        const message = err.response.data.message;
        console.log(message);
      });
  }, []);

  const handleCategorie = (id, nom) => {
    setIdCategorie(categorie.categorieId);
    setChipData((actual) => ({
      key: id,
      label: nom,
      color: "primary",
    }));
  };

  const handleDelete = (id) => {
    deleteMessage(id)
      .then((response) => {
        console.log("ok");
        // rajouter confirmation

        const msgTmp = liste.filter((message) => message.messageId !== id);
        setListe((actual) => msgTmp);
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
              Messages
            </Typography>
          </Box>
          <div>
            {categorie.map((categorie) => (
              <ListItem key={categorie.categorieId}>
                <Chip
                  icon={<Face />}
                  onClick={() =>
                    handleCategorie(
                      categorie.categorieId,
                      categorie.categorieNom
                    )
                  }
                  label={categorie.categorieNom}
                  // if label
                />
              </ListItem>
            ))}
          </div>
          {/* <Box>
            <Link to="/user/create">
              <Button variant="contained" color="primary">
                CREATE
              </Button>
            </Link>
          </Box> */}
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
                  {liste.map((message) => (
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
