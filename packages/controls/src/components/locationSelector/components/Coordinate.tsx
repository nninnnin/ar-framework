import clsx from "clsx";
import React from "react";

import { useCoordinateStore } from "../store";

const Coordinate = () => {
  const { coordinate } = useCoordinateStore();

  const lat = coordinate?.lat.toFixed(6) ?? 0;
  const lng = coordinate?.lng.toFixed(6) ?? 0;

  return (
    <div
      id="coord-label"
      className={clsx(
        "absolute bottom-[1px] right-[1px] bg-white",
        "z-[10]",
        "text-[13px] py-[2px] px-[4px] font-semibold",
        "border-l-[1px] border-t-[1px] border-black border-solid"
      )}
    >{`lat: ${lat}, lng: ${lng}`}</div>
  );
};

export default Coordinate;
