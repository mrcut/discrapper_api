const Home = ({ currentUser }) => {
  return (
    <div className="text-center p-5">
      Bienvenue {currentUser.prenom}
      <span className="text-uppercase"> {currentUser.nom}</span>
    </div>
  );
};

export default Home;
