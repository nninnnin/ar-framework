import React from "react";
import useSetModelsFromTemplate from "./hooks/useSetModelsFromTemplate";
import Overlay from "./components/Overlay";
import Menu from "./components/Menu";
import MenuToggler from "./components/MenuToggler";
import { useMenuStore } from "./stores";
import StatusPanel from "./components/StatusPanel";

const App = () => {
  const { isOpen: isMenuOpen } = useMenuStore();

  useSetModelsFromTemplate();

  return (
    <>
      <MenuToggler />

      {isMenuOpen && (
        <Overlay>
          <Menu />
        </Overlay>
      )}

      <StatusPanel />
    </>
  );
};

export default App;
