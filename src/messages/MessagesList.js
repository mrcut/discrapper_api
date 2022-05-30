import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCategories, getMessages } from "../api/api-messages";
import MessageByCategorie from "./MessageByCategorie";

const MessagesList = () => {
  const [liste, setListe] = useState([]);
  const [categorie, setCategorie] = useState([]);

  const [idCategorie, setIdCategorie] = useState(0);

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

  return (
    <div>
      <div>
        {categorie.map((categorie) => (
          <div key={categorie.categorieId}>
            <Button onClick={() => setIdCategorie(categorie.categorieId)}>
              {categorie.categorieNom}
            </Button>
          </div>
        ))}
      </div>

      <ul className="ul-menu">
        {idCategorie !== 0 ? (
          <MessageByCategorie id={idCategorie} />
        ) : (
          <>
            {liste.map((message) => (
              <li key={message.messageId} className="li-button">
                <div>
                  <p className="card-title">
                    <Link to={"/message/" + message.messageId}>
                      {message.messageContent}
                    </Link>
                  </p>
                  <p>Id : {message.messageId}</p>
                  <Button>{message.categorieId.categorieNom}</Button>
                </div>
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default MessagesList;
