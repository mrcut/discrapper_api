import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllCategories,
  getMessageByCategorie,
  getMessages,
} from "../api/api-messages";

const MessagesList = () => {
  const [liste, setListe] = useState([]);
  const [categorie, setCategorie] = useState([]);

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
        // setMessage((actual) => err.response.data.message);
      });
  }, []);

  const handleClick = (id) => {
    getMessageByCategorie(id).then((response) => {
      const msg = response.data;
    });
  };

  return (
    <div>
      <h1>Liste des Messages</h1>

      <div>
        {categorie.map((categorie) => (
          <div key={categorie.categorieId}>
            <Button onClick={handleClick(categorie.categorieId)}>
              {categorie.categorieNom}
            </Button>
          </div>
        ))}
      </div>

      <ul className="ul-menu">
        {liste.map((message) => (
          <li key={message.messageId} className="li-button">
            <div>
              <p className="card-title">
                <Link to={"/message/" + message.messageId}>
                  {message.messageContent}
                </Link>
              </p>
              <p>Id : {message.messageId}</p>
              <Button onClick={handleClick}>
                {message.categorieId.categorieNom}{" "}
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessagesList;
