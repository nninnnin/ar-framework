import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MediaUploadResult } from "@/types";
import { postGlbModels } from "@/utils";

const usePostGlbModel = () => {
  return useMutation({
    mutationFn: async (uploadedResult: MediaUploadResult[]) => {
      return await postGlbModels(uploadedResult);
    },
  });
};

export default usePostGlbModel;
