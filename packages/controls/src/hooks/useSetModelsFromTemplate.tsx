import { useModelStore } from "../stores";
import { useEffect } from "react";

const useSetModelsFromTemplate = () => {
  const { setModels } = useModelStore();

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
    }
  }, []);
};

export default useSetModelsFromTemplate;
