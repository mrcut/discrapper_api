import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
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
    <Container sx={{ p: 20 }} maxWidth="lg">
      {liste.map((discord) => (
        <Box
          sx={{
            flexDirection: "row",
            display: "flex",
            flexWrap: "wrap",
            p: 2,
            m: 1,
          }}
        >
          <Card sx={{ maxWidth: 345 }} key={"discord" + discord.discordId}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="240"
                image="https://images.squarespace-cdn.com/content/v1/52e15060e4b0fc9cf1eab269/1422543093241-MWGQL4ARNAS2U8A4IODL/LONDCENTRAL.jpg?format=1500w"
                alt="green iguana"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  textAlign="center"
                  component="div"
                >
                  {discord.discordNom}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions sx={{ justify: "center" }}>
              <Button size="small" href={discord.discordLien} color="primary">
                Join
              </Button>
            </CardActions>
          </Card>
        </Box>
      ))}
    </Container>
  );
};

export default Home;
