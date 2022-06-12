import { useEffect, useState } from "react";
import { deleteMessage, getMessageByCategorie } from "../api/api-messages";
import { Link } from "react-router-dom";
import { Button, ButtonGroup, TableCell, TableRow } from "@mui/material";
import { Delete, Visibility } from "@mui/icons-material";

const MessageByCategorie = ({ id }) => {
  const [categorie, setCategorie] = useState([]);

  useEffect(() => {
    getMessageByCategorie(id)
      .then((response) => {
        setCategorie((actual) => response.data);
        console.log(id);
      })
      .catch((err) => {
        console.log(id);

        console.log(err.response.data.setCategorie);
      });
  }, [id]);

  const handleDelete = (id) => {
    deleteMessage(id)
      .then((response) => {
        console.log("ok");

        const msgTmp = categorie.filter((message) => message.messageId !== id);
        setCategorie((actual) => msgTmp);
      })
      .catch((err) => {
        const error = err.response.data.error;
        console.log(error);
        console.log(id);
      });
  };

  return (
    // <div>

    categorie.map((message) => (
      <TableRow key={"msg" + message.messageId}>
        {categorie ? (
          <>
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
          </>
        ) : null}
      </TableRow>
    ))
  );
};

export default MessageByCategorie;
