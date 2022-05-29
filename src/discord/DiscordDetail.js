import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, ButtonGroup, Icon } from "@mui/material";
import { deleteDiscord, getDiscordById } from "../api/api-discord";

const DiscordDetail = () => {
  const [discord, setDiscord] = useState({});

  let { paramId } = useParams();

  const redirect = useNavigate();

  const handleDelete = () => {
    deleteDiscord(paramId)
      .then((response) => {
        redirect("/discords");
      })
      .catch((err) => {
        const discord = err.response.data.discord;
        console.log(discord);
      });
  };

  useEffect(() => {
    getDiscordById(paramId).then((response) => {
      const data = response.data;
      setDiscord((actual) => data);
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
                  Id du Discord : {discord.discordId}
                </h5>
                <p className="card-text">
                  Nom du Discord : {discord.discordNom}
                </p>
                <p className="card-text">
                  Channel du Discord :{discord.discordChannel}
                </p>
                <p className="card-text">
                  Lien du Discord : {discord.discordLien}
                </p>
                <ButtonGroup>
                  <Button href="/discord/update" variant="contained">
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

export default DiscordDetail;
