import clsx from "clsx";
import React, {
  createContext,
  useContext,
  useState,
} from "react";

import Slider from "./Slider";
import Save from "../icons/Save";
import { useModelStore } from "../../stores";
import { Axis, ControllingSubject } from "../../types";
import { sliderConfig } from "../../constants/inputConfig";
import { useControlStore } from "../../stores/controls";
import useModelElement from "../../hooks/useModelElement";
import useSyncController from "../../hooks/useSyncController";
import useUpdateModel from "../../hooks/useUpdateModel";
import SlideConfigSelector from "./SlideConfigSelector";

const SlideConfigContext = createContext<null | {
  step: number;
  min: number;
  max: number;
}>(null);

const ValueController = () => {
  const { controllingSubject } = useControlStore();

  const [slideConfigs, setSlideConfigs] =
    useState<null | {
      step: number;
      min: number;
      max: number;
      defaultValue: number;
    }>(sliderConfig[controllingSubject]);

  const handleChangeConfigValue =
    (configName: string) => (value: number) => {
      console.log("enw value", value);

      setSlideConfigs((prev) => ({
        ...prev,
        [configName]: value,
      }));
    };

  return (
    <ValueController.Container>
      <ValueController.Label />

      <div
        className={clsx(
          "h-full flex-1",
          "flex items-center"
        )}
      >
        <SlideConfigSelector
          configValues={slideConfigs}
          onChangeValue={{
            min: handleChangeConfigValue("min"),
            max: handleChangeConfigValue("max"),
            step: handleChangeConfigValue("step"),
          }}
        />

        <div className="w-full">
          <SlideConfigContext.Provider
            value={slideConfigs}
          >
            <ValueController.Slider />
          </SlideConfigContext.Provider>
        </div>
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
  const { isUpdating, updateModel } = useUpdateModel();

  const handleClick = async () => {
    await updateModel();
  };

  return (
    <div
      className={clsx(
        "w-[44px] h-[44px] bg-black",
        "p-[9px]"
      )}
      onClick={handleClick}
    >
      {isUpdating ? (
        <ValueController.SaveSpinner />
      ) : (
        <Save />
      )}
    </div>
  );
};

ValueController.SaveSpinner = () => {
  return (
    <svg
      width="120"
      height="30"
      viewBox="0 0 120 30"
      xmlns="http://www.w3.org/2000/svg"
      fill="#3498db"
    >
      <circle cx="15" cy="15" r="10">
        <animate
          attributeName="r"
          values="10;5;10"
          dur="0.8s"
          repeatCount="indefinite"
          begin="0s"
        />
      </circle>
      <circle cx="60" cy="15" r="5">
        <animate
          attributeName="r"
          values="5;10;5"
          dur="0.8s"
          repeatCount="indefinite"
          begin="0.2s"
        />
      </circle>
      <circle cx="105" cy="15" r="10">
        <animate
          attributeName="r"
          values="10;5;10"
          dur="0.8s"
          repeatCount="indefinite"
          begin="0.4s"
        />
      </circle>
    </svg>
  );
};

ValueController.Slider = () => {
  const { controllingSubject, axis } =
    useControlStore();

  return (
    <>
      {controllingSubject ===
        ControllingSubject.LocationCoordinate && (
        <input type="text" value="" />
      )}

      {controllingSubject ===
        ControllingSubject.FaceTarget && (
        <select></select>
      )}

      {controllingSubject ===
        ControllingSubject.Position && (
        <>
          {Boolean(axis) ? (
            <ValueController.PositionSlider />
          ) : (
            <div className="text-[13px] text-center">
              모델을 이동시킬 축을 먼저 선택하세요!
            </div>
          )}
        </>
      )}

      {controllingSubject ===
        ControllingSubject.Rotation && (
        <>
          {Boolean(axis) ? (
            <ValueController.RotationSlider />
          ) : (
            <div className="text-[13px] text-center">
              모델을 회전시킬 축을 먼저 선택하세요!
            </div>
          )}
        </>
      )}

      {controllingSubject ===
        ControllingSubject.Scale && (
        <ValueController.ScaleSlider />
      )}
    </>
  );
};

ValueController.PositionSlider = () => {
  const { modelElement } = useModelElement();
  const { selectedModelName } = useModelStore();
  const { setPosition, axis, controls } =
    useControlStore();

  useSyncController(ControllingSubject.Position);

  const sliderConfigs = useContext(SlideConfigContext);

  const handleChange = (value: number[]) => {
    const [position] = value;

    setPosition(selectedModelName, axis, position);

    if (modelElement) {
      const prevPosition = modelElement.getAttribute(
        "position"
      ) as unknown as Record<Axis, number>;

      const newPosition = {
        ...prevPosition,
        [axis]: position,
      };

      modelElement.setAttribute(
        "position",
        // @ts-ignore
        newPosition
      );
    }
  };

  const defaultValue =
    controls[selectedModelName][
      ControllingSubject.Position
    ][axis];

  return (
    <Slider
      {...sliderConfigs}
      value={[defaultValue]}
      onChange={handleChange}
    />
  );
};

ValueController.ScaleSlider = () => {
  const { modelElement } = useModelElement();
  const { selectedModelName } = useModelStore();

  useSyncController(ControllingSubject.Scale);

  const sliderConfigs = useContext(SlideConfigContext);

  const { setScale, controls } = useControlStore();

  const handleChange = (value: number[]) => {
    const [scale] = value;

    setScale(selectedModelName, scale);

    if (modelElement) {
      modelElement.setAttribute(
        "scale",
        // @ts-ignore
        `${scale} ${scale} ${scale}`
      );
    }
  };

  const scale =
    controls[selectedModelName][
      ControllingSubject.Scale
    ];

  return (
    <Slider
      {...sliderConfigs}
      value={[scale.x]}
      onChange={handleChange}
    />
  );
};

ValueController.RotationSlider = () => {
  const { modelElement } = useModelElement();
  const { selectedModelName } = useModelStore();
  const { setRotation, axis, controls } =
    useControlStore();

  useSyncController(ControllingSubject.Rotation);

  const sliderConfigs = useContext(SlideConfigContext);

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

  const defaultValue =
    controls[selectedModelName][
      ControllingSubject.Rotation
    ][axis];

  return (
    <Slider
      {...sliderConfigs}
      onChange={handleChange}
      value={[defaultValue]}
    />
  );
};

export default ValueController;
