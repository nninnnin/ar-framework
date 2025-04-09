import { useEffect, useRef } from "react";
import { ControllingSubject } from "../types";
import { useControlStore } from "../stores/controls";
import { useModelStore } from "../stores";

const useSyncController = (
  controllingSubject: ControllingSubject
) => {
  const {
    controls,
    setScale,
    setRotation,
    setPosition,
  } = useControlStore();
  const { selectedModelName } = useModelStore();

  const selectedModelControls =
    controls[selectedModelName];

  console.log("-_-", selectedModelControls);

  const isUpdated = useRef(false);

  useEffect(() => {
    if (isUpdated.current) return;

    if (!selectedModelControls) return;

    if (
      controllingSubject === ControllingSubject.Scale
    ) {
      setScale(
        selectedModelName,
        selectedModelControls["scale"].x
      );
    }

    if (
      controllingSubject ===
      ControllingSubject.Rotation
    ) {
      const { x, y, z } =
        selectedModelControls["rotation"];

      setRotation(selectedModelName, "x", x);
      setRotation(selectedModelName, "y", y);
      setRotation(selectedModelName, "z", z);
    }

    if (
      controllingSubject ===
      ControllingSubject.Position
    ) {
      const { x, y, z } =
        selectedModelControls["position"];

      setPosition(selectedModelName, "x", x);
      setPosition(selectedModelName, "y", y);
      setPosition(selectedModelName, "z", z);
    }

    isUpdated.current = true;
  }, [selectedModelControls]);
};

export default useSyncController;
