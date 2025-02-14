import clsx from "clsx";
import React from "react";
import { useCoordinateStore } from "../store";
import useModelElement from "../../../hooks/useModelElement";
import { useControlStore } from "../../../stores/controls";

const ConfirmButton = () => {
  const { setControllingSubject } = useControlStore();
  const { modelElement } = useModelElement();

  const { coordinate: selectedCoordinate } =
    useCoordinateStore();

  const closeLocationSelector = () =>
    setControllingSubject(null);

  const handleClick = () => {
    if (
      modelElement.parentElement &&
      selectedCoordinate
    ) {
      const { lat, lng } = selectedCoordinate;

      modelElement.parentElement.removeAttribute(
        "gps-projected-entity-place"
      );

      modelElement.parentElement.setAttribute(
        "gps-projected-entity-place",
        `latitude: ${lat}; longitude: ${lng}`
      );
    }

    closeLocationSelector();
  };

  return (
    <div
      className={clsx(
        selectedCoordinate
          ? "bg-black text-white"
          : "bg-gray-200 text-gray-300",
        "font-semibold text-[14px]",
        "absolute bottom-0 left-0",
        "translate-y-[100%]",
        "w-full h-[44px]",
        "flex justify-center items-center"
      )}
      onClick={handleClick}
    >
      새로운 좌표 적용하기
    </div>
  );
};

export default ConfirmButton;
