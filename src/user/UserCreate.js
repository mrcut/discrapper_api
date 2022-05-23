import { useState } from "react";
import UserForm from "./UserForm";
import UserResume from "./UserResume";

const elements = ["formulaire", "resume"];

const UserCreate = () => {
  const [element, setElement] = useState(elements[0]);

  const changeElement = (indice) => {
    setElement((actual) => elements[indice]);
  };

  return (
    <div>
      <h1 className="text-center">Créer un nouvel Utilisateur</h1>
      {element === elements[0] ? (
        <UserForm activerResume={() => changeElement(1)} />
      ) : null}
      {element === elements[1] ? (
        <UserResume activerForm={() => changeElement(0)} />
      ) : null}
    </div>
  );
};

export default UserCreate;
