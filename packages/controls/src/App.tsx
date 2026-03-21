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
import LocationButton from "./components/LocationButton";
import SelectModel from "./components/SelectModel";
import VisibilityButton from "./components/VisibilityButton";
import useSyncModelControlValues from "./hooks/useSyncModelControlValues";

const App = () => {
  const { isOpen: isMenuOpen } = useMenuStore();
  const { controllingSubject } = useControlStore();

  useSetModelsFromTemplate();
  useSyncModelControlValues();

  return (
    <>
      <MenuToggler />
      <LocationButton />
      <div className="fixed top-4 left-[72px] right-4 z-[200] flex gap-2">
        <VisibilityButton />
        <SelectModel />
      </div>

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
