import {
  getGlbModel,
  getGlbModels,
  updateGlbModel,
} from "@/entities/glbModel/utils/fetchers";

class GlbModelService {
  constructor() {}

  getGlbModel = async (uid: string) => {
    return await getGlbModel(uid);
  };

  getGlbModels = async () => {
    return await getGlbModels();
  };

  updateGlbModel = async (uid: string) => {
    await updateGlbModel({
      uid: "uid",
      publish: true,
      data: {},
    });
  };
}

export default GlbModelService;
