import { Typography } from "@mui/material";

const Home = ({ currentUser }) => {
  return (
    <Typography variant="h5" textAlign={"center"}>
      Bienvenue {currentUser.prenom}
      <span className="text-uppercase"> {currentUser.nom}</span>
    </Typography>
  );
};

export default Home;
