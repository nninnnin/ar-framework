import React from "react";
import clsx from "clsx";
import { glass } from "@ar-framework/ui";
import { useControlStore } from "../stores/controls";
import { useModelStore } from "../stores";
import { ControllingSubject } from "../types";

const LocationButton = () => {
  const { selectedModelName } = useModelStore();
  const { setControllingSubject } = useControlStore();

  const handleClick = () => {
    if (!selectedModelName) return;
    setControllingSubject(ControllingSubject.LocationCoordinate);
  };

  return (
    <div
      className={clsx(
        "fixed bottom-6 left-6 z-[200]",
        "w-[56px] h-[56px] rounded-full",
        "flex justify-center items-center",
        "transition-all duration-150",
        glass.base,
        !selectedModelName
          ? [glass.variants.surface, "opacity-20 pointer-events-none grayscale"]
          : [glass.variants.active, "cursor-pointer active:scale-95 active:opacity-60"]
      )}
      onClick={handleClick}
    >
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="10" r="3" stroke={selectedModelName ? "#22c55e" : "white"} strokeWidth="1.5" />
        <path
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
          stroke={selectedModelName ? "#22c55e" : "white"}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default LocationButton;
