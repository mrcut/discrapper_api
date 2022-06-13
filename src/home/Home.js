import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  CardMedia,
  Grid,
} from "@mui/material";
import { Container } from "@mui/system";

import { useEffect, useState } from "react";
import { getAllDiscords } from "../api/api-discord";

const Home = ({ currentUser }) => {
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
    <Container maxWidth="md" component="main">
      <Grid container spacing={5} alignItems="flex-end" p={10}>
        {liste.map((discord) => (
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345 }} key={"discord" + discord.discordId}>
              <CardHeader
                title={discord.discordNom}
                titleTypographyProps={{ align: "center" }}
              />

              <CardActionArea>
                <CardMedia
                  component="img"
                  height="240"
                  image="https://images.squarespace-cdn.com/content/v1/52e15060e4b0fc9cf1eab269/1422543093241-MWGQL4ARNAS2U8A4IODL/LONDCENTRAL.jpg?format=1500w"
                  alt="green iguana"
                />
              </CardActionArea>

              <CardActions>
                <Button
                  fullWidth
                  variant="text"
                  href={discord.discordLien}
                  color="secondary"
                >
                  Join
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
