import React from "react";

import useSetModelsFromTemplate from "./hooks/useSetModelsFromTemplate";
import Overlay from "./components/Overlay";
import Menu from "./components/Menu";
import MenuToggler from "./components/MenuToggler";
import { useMenuStore } from "./stores";
import StatusPanel from "./components/statusPanel";
import ValueController from "./components/valueController";
import { useControlStore } from "./stores/controls";
import { ControllingSubject } from "./types";
import LocationSelector from "./components/locationSelector";
import useSyncModelControlValues from "./hooks/useSyncModelControlValues";

const App = () => {
  const { isOpen: isMenuOpen } = useMenuStore();
  const { controllingSubject } = useControlStore();

  useSetModelsFromTemplate();
  useSyncModelControlValues();

  return (
    <>
      <MenuToggler />

      {Boolean(controllingSubject) && <StatusPanel />}

      {Boolean(controllingSubject) &&
        controllingSubject !==
          ControllingSubject.LocationCoordinate && (
          <ValueController />
        )}

      {controllingSubject ===
        ControllingSubject.LocationCoordinate && (
        <LocationSelector />
      )}

      {isMenuOpen && (
        <Overlay>
          <Menu />
        </Overlay>
      )}
    </>
  );
};

export default App;
