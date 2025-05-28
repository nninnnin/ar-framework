import { useEffect } from "react";
import { useModelStore } from "../stores";
import { useControlStore } from "../stores/controls";
import { useCoordinateStore } from "../components/locationSelector/store";

const useSyncModelControlValues = () => {
  const { models, selectedModelName } =
    useModelStore();

  const selectedModel = models.find(
    (model) => model.name === selectedModelName
  );

  const { setModelControls } = useControlStore();

  const { setCoordinate } = useCoordinateStore();

  useEffect(() => {
    (async function () {
      if (!selectedModel) return;

      const modelId = selectedModel.id.split("#")[1];

      const res = await fetch(
        `${
          process.env.API_URL ??
          "https://ar-framework-web.vercel.app"
        }/glbModels/api?glbModelId=${modelId}`
      );

      const glbModelData = await res.json();

      const position = initControlValues(
        glbModelData.position
      );

      const rotation = initControlValues(
        glbModelData.rotation
      );

      const scale = initControlValues(
        glbModelData.scale
      );

      const visibility = glbModelData.visibility;

      setModelControls(selectedModel.name, {
        position,
        rotation,
        scale,
        visibility,
      });

      const coordinate = initCoordinate(
        glbModelData.latitude,
        glbModelData.longitude
      );

      if (coordinate) {
        setCoordinate(coordinate.lat, coordinate.lng);
      }
    })();
  }, [selectedModel]);
};

export const initControlValues = (
  strValue: string
) => {
  return strValue
    ? JSON.parse(strValue)
    : { x: 0, y: 0, z: 0 };
};

const initCoordinate = (lat: string, lng: string) => {
  if (!lat || !lng) return null;

  return {
    lat: parseFloat(lat),
    lng: parseFloat(lng),
  };
};

export default useSyncModelControlValues;
