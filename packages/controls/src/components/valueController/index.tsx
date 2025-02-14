import clsx from "clsx";
import React from "react";

import Slider from "./Slider";
import Save from "../icons/Save";
import { useModelStore } from "../../stores";
import { Axis, ControllingSubject } from "../../types";
import { sliderConfig } from "../../constants/inputConfig";
import { useControlStore } from "../../stores/controls";
import useModelElement from "../../hooks/useModelElement";

const ValueController = () => {
  const { controllingSubject, axis } =
    useControlStore();

  return (
    <ValueController.Container>
      <ValueController.Label />

      <div className="flex-1">
        {controllingSubject ===
          ControllingSubject.LocationCoordinate && (
          <input type="text" value="" />
        )}

        {controllingSubject ===
          ControllingSubject.FaceTarget && (
          <select></select>
        )}

        {controllingSubject ===
          ControllingSubject.Position &&
          Boolean(axis) && (
            <ValueController.PositionSlider />
          )}

        {controllingSubject ===
          ControllingSubject.Rotation &&
          Boolean(axis) && (
            <ValueController.RotationSlider />
          )}

        {controllingSubject ===
          ControllingSubject.Scale && (
          <ValueController.ScaleSlider />
        )}
      </div>

      <ValueController.SaveButton />
    </ValueController.Container>
  );
};

ValueController.Container = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      className={clsx(
        "fixed bottom-0 left-0",
        "w-full h-[44px]",
        "flex justify-center items-center",
        "bg-white",
        "border-t-[1px] border-black border-solid"
      )}
    >
      {children}
    </div>
  );
};

ValueController.Label = () => {
  return <></>;
};

ValueController.SaveButton = () => {
  return (
    <div
      className={clsx(
        "w-[44px] h-[44px] bg-black",
        "p-[9px]"
      )}
    >
      <Save />
    </div>
  );
};

ValueController.PositionSlider = () => {
  return (
    <Slider
      {...sliderConfig[ControllingSubject.Position]}
      onChange={(value) => console.log(value)}
    />
  );
};

ValueController.ScaleSlider = () => {
  const { modelElement } = useModelElement();
  const { selectedModelName } = useModelStore();
  const { setScale } = useControlStore();

  const handleChange = (value: number[]) => {
    const [scale] = value;

    setScale(selectedModelName, scale);

    if (modelElement) {
      modelElement.parentElement.setAttribute(
        "scale",
        // @ts-ignore
        `${scale} ${scale} ${scale}`
      );
    }
  };

  return (
    <Slider
      {...sliderConfig[ControllingSubject.Scale]}
      onChange={handleChange}
    />
  );
};

ValueController.RotationSlider = () => {
  const { modelElement } = useModelElement();
  const { selectedModelName } = useModelStore();
  const { setRotation, axis } = useControlStore();

  const handleChange = (value: number[]) => {
    const [rotation] = value;

    setRotation(selectedModelName, axis, rotation);

    if (modelElement) {
      const prevRotation = modelElement.getAttribute(
        "rotation"
      ) as unknown as Record<Axis, number>;

      modelElement.setAttribute(
        "rotation",
        // @ts-ignore
        {
          ...prevRotation,
          [axis]: rotation,
        }
      );
    }
  };

  return (
    <Slider
      {...sliderConfig[ControllingSubject.Rotation]}
      onChange={handleChange}
    />
  );
};

export default ValueController;
