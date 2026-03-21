import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import { glass } from "@ar-framework/ui";
import { useModelStore } from "../stores";
import { useControlStore } from "../stores/controls";
import useUpdateModel from "../hooks/useUpdateModel";
import useModelElement from "../hooks/useModelElement";

const VisibilityButton = () => {
  const { selectedModelName } = useModelStore();
  const { controls, setVisibility } = useControlStore();
  const { modelElement } = useModelElement();
  const { updateModel } = useUpdateModel();
  const isVisibilityChanged = useRef(false);

  const currentModelVisible = controls[selectedModelName as string]
    ? controls[selectedModelName as string]["visibility"]
    : null;

  useEffect(() => {
    if (currentModelVisible === null || !isVisibilityChanged.current) return;

    (async function () {
      await updateModel();
    })();
  }, [currentModelVisible]);

  const handleClick = () => {
    if (!selectedModelName || currentModelVisible === null) return;

    isVisibilityChanged.current = true;

    if (currentModelVisible) {
      setVisibility(selectedModelName, false);
      modelElement.setAttribute("visible", "false");
    } else {
      setVisibility(selectedModelName, true);
      modelElement.setAttribute("visible", "true");
    }
  };

  const isDisabled = !selectedModelName || currentModelVisible === null;

  return (
    <div
      className={clsx(
        "w-[44px] h-[44px] rounded-[10px] shrink-0",
        "flex justify-center items-center",
        "transition-all duration-150",
        glass.base,
        isDisabled
          ? [glass.variants.surface, "opacity-20 pointer-events-none grayscale"]
          : [glass.variants.surface, "cursor-pointer active:scale-95 active:opacity-60"]
      )}
      onClick={handleClick}
    >
      {currentModelVisible === false ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M3 3l18 18M10.5 10.677A3 3 0 0013.322 13.5M6.357 6.357C4.25 7.825 2.571 9.861 2 12c1.273 4.94 6 8.5 10 8.5 1.755 0 3.403-.51 4.823-1.377M9.53 4.53A9.77 9.77 0 0112 4c4 0 8.727 3.56 10 8.5-.47 1.83-1.49 3.48-2.85 4.82" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M2 12C3.273 7.06 8 3.5 12 3.5S20.727 7.06 22 12c-1.273 4.94-6 8.5-10 8.5S3.273 16.94 2 12z" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.5" />
        </svg>
      )}
    </div>
  );
};

export default VisibilityButton;
