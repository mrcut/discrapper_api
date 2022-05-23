const UserResume = ({ activerForm }) => {
  return (
    <div>
      <h3>Infos de l'Utilisateur</h3>
      <button className="btn btn-primary" onClick={activerForm}>
        Nouvel Utilisateur
      </button>
    </div>
  );
};

export default UserResume;
