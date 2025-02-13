import { useEffect } from "react";

import { useModelStore } from "../stores";
import { useControlStore } from "../stores/controls";

const useSetModelsFromTemplate = () => {
  const { setModels } = useModelStore();
  const { initializeModelControls } =
    useControlStore();

  useEffect(() => {
    const models = document.querySelectorAll(
      "a-gltf-model"
    );

    if (models && models.length) {
      setModels(
        Array.from(models)
          .filter(
            (model) =>
              !model.hasAttribute(
                "mindar-face-occluder"
              )
          )
          .map((model: HTMLElement) => ({
            id: model.getAttribute("src"),
            name: model.dataset.modelName,
          }))
      );

      models.forEach((model: HTMLElement) => {
        const { modelName } = model.dataset;

        initializeModelControls(modelName);
      });
    }
  }, []);
};

export default useSetModelsFromTemplate;
