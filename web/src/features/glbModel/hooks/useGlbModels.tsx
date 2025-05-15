import { useQuery } from "@tanstack/react-query";

import { QueryKeys } from "@/shared/constants/queryKeys";
import { getGlbModels } from "@/app/templates/utils/fetchers/glbModels";
import { GlbModelFormatted } from "@/features/glbModel/types/glbModel";

type Options = { modelIds?: string[] };

const useGlbModels = (options: Options) => {
  const { modelIds } = options;

  return useQuery<GlbModelFormatted[]>({
    queryKey: [QueryKeys.GlbModels, modelIds],
    queryFn: async () => {
      const glbModels = await (modelIds
        ? getGlbModels(modelIds)
        : getGlbModels());

      return glbModels;
    },
  });
};

export default useGlbModels;
