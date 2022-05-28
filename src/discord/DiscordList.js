import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllDiscords } from "../api/api-user";

const DiscordList = () => {
  const [liste, setListe] = useState([]);

  useEffect(() => {
    getAllDiscords()
      .then((response) => {
        const discords = response.data;
        setListe((actual) => discords);
        console.log(discords);
      })
      .catch((err) => {
        const discord = err.response.data.discord;
        console.log(discord);
      });
  }, []);

  return (
    <div>
      <h1>Liste des discords</h1>
      <ul className="ul-menu">
        {liste.map((discord) => (
          <li key={discord.discordId} className="li-button">
            <div>
              <p>{discord.discordId}</p>
              <p className="card-title">
                <Link to={"/discord/" + discord.discordId}>
                  {discord.discordNom}
                </Link>
              </p>
              <p>{discord.discordLien}</p>
              <p>{discord.discordChanel}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiscordList;
