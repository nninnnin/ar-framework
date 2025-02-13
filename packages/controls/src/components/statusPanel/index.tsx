import clsx from "clsx";
import React from "react";

import { useModelStore } from "../../stores";
import AxisToggler from "./AxisToggler";
import SelectedModel from "./SelectedModel";

const StatusPanel = () => {
  const { selectedModelName } = useModelStore();

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

      <AxisToggler />
    </div>
  );
};

export default StatusPanel;
