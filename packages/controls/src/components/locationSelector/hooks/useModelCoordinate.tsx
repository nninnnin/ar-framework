import { useEffect } from "react";
import useModelElement from "../../../hooks/useModelElement";

const useModelCoordinate = () => {
  const { modelElement } = useModelElement();

  useEffect(() => {
    console.log(modelElement);
  }, [modelElement]);

  return;
};

export default useModelCoordinate;
