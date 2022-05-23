import { useState } from "react";
import DiscordForm from "./DiscordForm";
import DiscordResume from "./DiscordResume";

const elements = ["formulaire", "resume"];

const DiscordCreate = () => {
  const [element, setElement] = useState(elements[0]);

  const changeElement = (indice) => {
    setElement((actual) => elements[indice]);
  };

  return (
    <div>
      <h1 className="text-center">Créer un nouveau Discord</h1>
      {element === elements[0] ? (
        <DiscordForm activerResume={() => changeElement(1)} />
      ) : null}
      {element === elements[1] ? (
        <DiscordResume activerForm={() => changeElement(0)} />
      ) : null}
    </div>
  );
};

export default DiscordCreate;
