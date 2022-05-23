import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMessageById } from "../api/api-user";

const MessageDetail = () => {
  const [message, setMessage] = useState({});

  let { paramId } = useParams();
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
                  Catégorie du Message :{message.categorieId.categorieNom}
                </p>
                <p className="card-text">
                  Provient du Discord : {message.messageDiscord}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageDetail;
