import { useState } from "react";
import { useModelStore } from "../stores";
import { useControlStore } from "../stores/controls";
import { useCoordinateStore } from "../components/locationSelector/store";

const useUpdateModel = () => {
  const { controls } = useControlStore();
  const { coordinate } = useCoordinateStore();

  const { selectedModelName, models } =
    useModelStore();

  const [updating, setUpdating] = useState(false);

  const selectedModel = models.find((model) => {
    return model.name === selectedModelName;
  });

  const updateModel = async () => {
    if (updating) return;

    setUpdating(true);

    const modelId = selectedModel.id.split("#")[1];

    const res = await fetch(
      `https://ar-framework-web.vercel.app/glbModels/api?glbModelId=${modelId}`
    );

    const glbModelData = await res.json();

    const controlValues =
      controls[selectedModel!.name];

    const updateProperties = {
      position: JSON.stringify(
        controlValues["position"]
      ),
      rotation: JSON.stringify(
        controlValues["rotation"]
      ),
      scale: JSON.stringify(controlValues["scale"]),
      latitude: String(
        (coordinate?.lat).toFixed(6) ?? ""
      ),
      longitude: String(
        (coordinate?.lng).toFixed(6) ?? ""
      ),
    };

    const updateBody = {
      ...glbModelData,
      name: {
        KO: glbModelData.name,
      },
      ...updateProperties,
      isDeleted: "false",
    };

    const updateRes = await fetch(
      `https://ar-framework-web.vercel.app/glbModels/api?glbModelId=${modelId}`,
      {
        method: "PUT",
        body: JSON.stringify(updateBody),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setUpdating(false);
  };

  return {
    isUpdating: updating,
    updateModel,
  };
};

export default useUpdateModel;
