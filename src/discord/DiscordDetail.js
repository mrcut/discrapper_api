import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDiscordById } from "../api/api-discord";

const DiscordDetail = () => {
  const [discord, setDiscord] = useState({});

  let { paramId } = useParams();

  useEffect(() => {
    getDiscordById(paramId).then((response) => {
      const data = response.data;
      setDiscord((actual) => data);
    });
  }, [paramId]);

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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscordDetail;
