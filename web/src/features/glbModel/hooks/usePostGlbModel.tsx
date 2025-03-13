import { useMutation } from "@tanstack/react-query";

import { MediaUploadResult } from "@/shared/types";
import { postGlbModels } from "@/entities/glbModel/utils/fetchers";

const usePostGlbModel = () => {
  return useMutation({
    mutationFn: async (
      uploadedResult: MediaUploadResult[]
    ) => {
      return await postGlbModels(uploadedResult);
    },
  });
};

export default usePostGlbModel;
