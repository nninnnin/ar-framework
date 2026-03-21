import React from "react";
import { Button } from "@ar-framework/ui";
import { useCoordinateStore } from "../store";
import useModelElement from "../../../hooks/useModelElement";
import { useControlStore } from "../../../stores/controls";
import useUpdateModel from "../../../hooks/useUpdateModel";

const ConfirmButton = () => {
  const { setControllingSubject } = useControlStore();
  const { modelElement } = useModelElement();

  const { coordinate: selectedCoordinate } =
    useCoordinateStore();

  const { isUpdating, updateModel } = useUpdateModel();

  const closeLocationSelector = () =>
    setControllingSubject(null);

  const handleClick = async () => {
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

      await updateModel();
    }

    closeLocationSelector();
  };

  return (
    <div className="absolute bottom-0 left-0 translate-y-[100%] w-full">
      <Button
        variant="primary"
        onClick={handleClick}
        disabled={!selectedCoordinate}
        loading={isUpdating}
        fullWidth
      >
        {isUpdating ? "저장중.." : "새로운 좌표 저장하기"}
      </Button>
    </div>
  );
};

export default ConfirmButton;
