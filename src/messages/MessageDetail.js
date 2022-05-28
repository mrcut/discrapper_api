import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteMessage, getMessageById } from "../api/api-user";
import { Button, ButtonGroup, Icon } from "@mui/material";
import MessagesList from "./MessagesList";

const MessageDetail = () => {
  const [message, setMessage] = useState({});

  let { paramId } = useParams();

  const redirect = useNavigate();

  const handleDelete = () => {
    deleteMessage(paramId)
      .then((response) => {
        redirect("/messages");
      })
      .catch((err) => {
        const message = err.response.data.message;
        console.log(message);
      });
  };

  useEffect(() => {
    getMessageById(paramId).then((response) => {
      const data = response.data;
      setMessage((actual) => data);
    });
  }, []);

  return (
    <div className="row">
      <div className="col-8">
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">
                  Id du Message : {message.messageId}
                </h5>
                <p className="card-text">
                  Contenu du Message : {message.messageContent}
                </p>
                <p className="card-text">
                  Catégorie du Message :{message.discord}
                </p>
                <p className="card-text">
                  Provient du Discord : {message.messageDiscord}
                </p>
                <ButtonGroup>
                  <Button href="/user/profile" variant="contained">
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleDelete}
                    color="error"
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageDetail;
