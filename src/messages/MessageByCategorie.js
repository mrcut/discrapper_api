import { useEffect, useState } from "react";
import { getMessageByCategorie } from "../api/api-messages";
import { Link } from "react-router-dom";
import { Chip } from "@mui/material";
import { Face } from "@mui/icons-material";

const MessageByCategorie = ({ id }) => {
  const [categorie, setCategorie] = useState([]);

  useEffect(() => {
    getMessageByCategorie(id)
      .then((response) => {
        setCategorie((actual) => response.data);
      })
      .catch((err) => {
        console.log(err.response.data.setCategorie);
      });
  }, [id]);

  return (
    <div>
      <h1>Liste des Messages</h1>

      <Chip icon={<Face />} label="With Icon">
        {categorie.categorieNom}
      </Chip>

      <ul className="ul-menu">
        {categorie.map((message) => (
          <li key={message.messageId} className="li-button">
            <div>
              <p className="card-title">
                <Link to={"/message/" + message.messageId}>
                  {message.messageContent}
                </Link>
              </p>
              <Chip>Id : {message.messageId}</Chip>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageByCategorie;
