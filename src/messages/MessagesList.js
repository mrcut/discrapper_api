import { useEffect, useState } from "react";
import { getMessages } from "../api/api-user";
import MessageCard from "./MessageCard";

const MessagesList = () => {
  const [liste, setListe] = useState([]);

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

  const messagesJsx = liste.map((message) => (
    <div key={message.messageId} className="col">
      <MessageCard
        id={message.messageId}
        content={message.messageContent}
        categorie={message.categorieId.categorieNom}
        discord={message.discordId.discordNom}
      />
    </div>
  ));

  return (
    <>
      <div className="row">
        <div className="col-8">
          <div className="text-center">
            <h1>Liste des Messages</h1>
          </div>
          <div className="row row-cols-1 row-cols-md-4 g-4">{messagesJsx}</div>
        </div>
      </div>
    </>
  );
};

export default MessagesList;
