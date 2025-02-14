import { useState, useEffect } from "react";
import { useModelStore } from "../../../stores";

const useModelElement = () => {
  const [modelElement, setModelElement] =
    useState<null | HTMLElement>(null);

  const { selectedModelName } = useModelStore();

  useEffect(() => {
    if (!selectedModelName) return;

    const modelElement = document.querySelector(
      `[data-model-name="${selectedModelName}"]`
    );

    if (modelElement) {
      setModelElement(modelElement as HTMLElement);
    }
  }, [selectedModelName]);

  return {
    modelElement,
  };
};

export default useModelElement;
