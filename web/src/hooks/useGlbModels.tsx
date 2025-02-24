import { getGlbModels } from "@/app/templates/utils/fetcher";
import { QueryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";

const useGlbModels = (options: {
  modelIds?: string[];
  asFile?: boolean;
}) => {
  const { modelIds, asFile } = options;

  return useQuery({
    queryKey: [QueryKeys.GlbModels],
    queryFn: async () => {
      const glbModels = await (modelIds
        ? getGlbModels(modelIds)
        : getGlbModels());

      if (asFile) {
        return await Promise.all(
          glbModels.map(async (model) => {
            const res = await fetch(model.path);

            const blob = await res.blob();
            const file = new File([blob], model.name, {
              type: blob.type,
            });

            return {
              id: model.uid,
              file,
            };
          })
        );
      }

      return glbModels;
    },
  });
};

export default useGlbModels;
