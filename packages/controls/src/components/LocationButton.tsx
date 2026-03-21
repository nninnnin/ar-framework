import React from "react";
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
      className={`
        fixed bottom-6 left-6 z-[200]
        w-[56px] h-[56px] rounded-full
        flex justify-center items-center
        backdrop-blur-xl
        border shadow-[0_4px_24px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)]
        transition-all duration-150
        ${!selectedModelName
          ? "opacity-20 pointer-events-none grayscale bg-white/10 border-white/20"
          : "cursor-pointer active:scale-95 active:opacity-60 bg-white/20 border-white/30"
        }
      `}
      onClick={handleClick}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
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
