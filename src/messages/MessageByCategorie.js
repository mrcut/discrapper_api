import { useEffect, useState } from "react";
import { getMessageByCategorie } from "../api/api-messages";
import { Link } from "react-router-dom";

const MessageByCategorie = ({ id }) => {
  const [categorie, setCategorie] = useState([]);
  // const [idCategorie, setIdCategorie] = useState(0);

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

      <h4>{categorie.categorieNom}</h4>
      <ul className="ul-menu">
        {categorie.map((message) => (
          <li key={message.messageId} className="li-button">
            <div>
              <p className="card-title">
                <Link to={"/message/" + message.messageId}>
                  {message.messageContent}
                </Link>
              </p>
              <p>Id : {message.messageId}</p>
              {/*<Button>{message.categorieId.categorieNom}</Button>*/}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageByCategorie;
