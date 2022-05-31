import { useEffect, useState } from "react";
import { getUserFromLocalStorage } from "./constantes";
import RoutesCustom from "./components/RoutesCustom";

function App() {
  return (
    <div className="App">
      <RoutesCustom />
    </div>
  );
}

export default App;
