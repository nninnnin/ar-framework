import React from "react";
import { useModelStore } from "../stores";
import clsx from "clsx";

const StatusPanel = () => {
  const { selectedModelName } = useModelStore();

  return (
    <div
      className={clsx(
        "fixed top-0 right-0",
        "flex flex-col",
        "bg-white"
      )}
    >
      <div className="p-[1em]">
        {selectedModelName}
      </div>
    </div>
  );
};

export default StatusPanel;
