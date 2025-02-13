import React from "react";

import useSetModelsFromTemplate from "./hooks/useSetModelsFromTemplate";
import Overlay from "./components/Overlay";
import Menu from "./components/Menu";
import MenuToggler from "./components/MenuToggler";
import { useMenuStore } from "./stores";
import StatusPanel from "./components/statusPanel";
import ValueController from "./components/valueController";
import { useControlStore } from "./stores/controls";

const App = () => {
  const { isOpen: isMenuOpen } = useMenuStore();
  const { controllingSubject } = useControlStore();

  useSetModelsFromTemplate();

  return (
    <>
      <MenuToggler />

      {Boolean(controllingSubject) && <StatusPanel />}

      {isMenuOpen && (
        <Overlay>
          <Menu />
        </Overlay>
      )}

      {Boolean(controllingSubject) && (
        <ValueController />
      )}
    </>
  );
};

export default App;
