import clsx from "clsx";
import React, { useEffect, useState } from "react";

import Slider from "./Slider";
import Save from "../icons/Save";
import { useModelStore } from "../../stores";
import { Axis, ControllingSubject } from "../../types";
import { sliderConfig } from "../../constants/inputConfig";
import { useControlStore } from "../../stores/controls";

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

ValueController.RotationSlider = () => {
  const [modelElement, setModelElement] =
    useState<null | HTMLElement>(null);

  const { selectedModelName } = useModelStore();

  const { setRotation, axis, controls } =
    useControlStore();

  useEffect(() => {
    if (!selectedModelName) return;

    const modelElement = document.querySelector(
      `[data-model-name="${selectedModelName}"]`
    );

    console.log("I got model element: ", modelElement);

    if (modelElement) {
      setModelElement(modelElement as HTMLElement);
    }
  }, [selectedModelName]);

  const handleChange = (value: number[]) => {
    const [rotation] = value;

    console.log(
      rotation,
      selectedModelName,
      axis,
      rotation
    );

    console.log(controls);

    setRotation(selectedModelName, axis, rotation);

    if (modelElement) {
      console.log("has element?", modelElement);

      const prevRotation = modelElement.getAttribute(
        "rotation"
      ) as unknown as Record<Axis, number>;

      console.log("prev rotation", prevRotation);

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
