import clsx from "clsx";
import React from "react";

import Map from "./components/Map";
import Coordinate from "./components/Coordinate";
import Overlay from "../Overlay";
import ConfirmButton from "./components/ConfirmButton";

const LocationSelector = () => {
  return (
    <Overlay>
      <LocationSelector.Container>
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
