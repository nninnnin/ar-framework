import clsx from "clsx";
import React from "react";

import { useModelStore } from "../../stores";
import AxisToggler from "./AxisToggler";
import SelectedModel from "./SelectedModel";
import { useControlStore } from "../../stores/controls";
import { ControllingSubject } from "../../types";
import { SUBJECT_LABEL } from "../../constants/uxWrite";

const StatusPanel = () => {
  const { selectedModelName } = useModelStore();
  const { controllingSubject, controls, axis } =
    useControlStore();

  return (
    <div
      className={clsx(
        "fixed top-0 right-0",
        "flex flex-col justify-center items-center",
        "bg-white",
        "text-[13px]",
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
        <>
          <AxisToggler />
        </>
      )}

      <div className="w-full border-t-[1px] border-solid border-black text-center px-[8px] py-[3px]">
        {`${SUBJECT_LABEL[controllingSubject]} ${(
          axis ?? ""
        ).toUpperCase()} ${
          controls[selectedModelName][
            controllingSubject
          ][
            controllingSubject ===
            ControllingSubject.Scale
              ? "x"
              : axis
          ] ?? ""
        }`}
      </div>
    </div>
  );
};

export default StatusPanel;
