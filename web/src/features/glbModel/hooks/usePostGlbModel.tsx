import { useMutation } from "@tanstack/react-query";

import {
  GlbModelUploadResult,
  postGlbModels,
} from "@/entities/glbModel/utils/fetchers";

const usePostGlbModel = () => {
  return useMutation({
    mutationFn: async (
      uploadedResult: GlbModelUploadResult[]
    ) => {
      return await postGlbModels(uploadedResult);
    },
  });
};

export default usePostGlbModel;
