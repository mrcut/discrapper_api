import { Link } from "react-router-dom";

const style01 = { maxWidth: "14rem" };

const MessageCard = ({ id, content, categorie, discord }) => {
  return (
    <div className="card" style={style01}>
      <div className="card-body">
        <h5 className="card-title">
          <Link to={"/message/" + id}>{content}</Link>
        </h5>
      </div>
      <p className="card-text">Catégorie : {categorie}</p>
      <p className="card-text">Discord : {discord}</p>
    </div>
  );
};

export default MessageCard;
