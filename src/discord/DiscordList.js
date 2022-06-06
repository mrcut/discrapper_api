import { AddCircle } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllDiscords } from "../api/api-discord";

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
        console.log(err.response.data);
      });
  }, []);

  return (
    <div>
      <h1>Liste des Discords</h1>

      <div>
        <Button
          variant="contained"
          startIcon={<AddCircle />}
          href="/discord/create"
        >
          Add Discord
        </Button>
        <table border="1" cellPadding={10}>
          <tr>
            <td>Nom</td>
            <td>Lien</td>
            <td>Channel ID</td>
          </tr>

          {liste.map((discord) => (
            <tr key={discord.discordId}>
              <td>
                <Link to={"/discord/" + discord.discordId}>
                  {discord.discordNom}
                </Link>
              </td>
              <td>{discord.discordLien}</td>
              <td>{discord.discordChannel}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default DiscordList;
