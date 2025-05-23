import clsx from "clsx";
import React from "react";

import Map from "./components/Map";
import Coordinate from "./components/Coordinate";
import Overlay from "../Overlay";
import ConfirmButton from "./components/ConfirmButton";
import { useControlStore } from "../../stores/controls";
import CurrentCoords from "./components/CurrentCoords";

const LocationSelector = () => {
  const { setControllingSubject } = useControlStore();

  return (
    <Overlay>
      <LocationSelector.Container>
        <div
          className={clsx(
            "absolute top-[0px] left-1/2 -translate-x-1/2 z-[9999] -translate-y-[100%]",
            "w-[calc(100%-2px)] h-[50px]",
            "flex justify-center items-center",
            "bg-white"
          )}
          onClick={() => setControllingSubject(null)}
        >
          닫기
        </div>

        <CurrentCoords />

        <Map />
        <Coordinate />

        <ConfirmButton />
      </LocationSelector.Container>
    </Overlay>
  );
};

LocationSelector.Container = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      className={clsx(
        "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        "bg-white",
        "w-[300px] h-[300px]"
      )}
    >
      {children}
    </div>
  );
};

export default LocationSelector;
