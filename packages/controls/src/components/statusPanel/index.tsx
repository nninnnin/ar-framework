import clsx from "clsx";
import React from "react";

import { useModelStore } from "../../stores";
import AxisToggler from "./AxisToggler";
import SelectedModel from "./SelectedModel";
import { useControlStore } from "../../stores/controls";
import { ControllingSubject } from "../../types";

const StatusPanel = () => {
  const { selectedModelName } = useModelStore();
  const { controllingSubject, controls } =
    useControlStore();

  return (
    <div
      className={clsx(
        "fixed top-0 right-0",
        "flex flex-col justify-center items-center",
        "bg-white",
        "text-[11px]",
        "border-l-[1px] border-b-[1px] border-solid border-black"
      )}
    >
      {selectedModelName && (
        <SelectedModel>
          {selectedModelName}
        </SelectedModel>
      )}

      {(controllingSubject ===
        ControllingSubject.Position ||
        controllingSubject ===
          ControllingSubject.Rotation) && (
        <AxisToggler />
      )}

      {controllingSubject ===
        ControllingSubject.Scale && (
        <div className="w-full border-t-[1px] border-solid border-black text-center">
          Scale{" "}
          {
            controls[selectedModelName][
              ControllingSubject.Scale
            ]["x"]
          }
        </div>
      )}
    </div>
  );
};

export default StatusPanel;
