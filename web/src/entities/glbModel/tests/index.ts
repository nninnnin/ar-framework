import { getGlbModel } from "@/entities/glbModel/tests/getGlbModel";
import { getGlbModels } from "@/entities/glbModel/tests/getGlbModels";
import { TestSuite } from "@/shared/types/test";

const glbModelTestSuite: TestSuite = [
  getGlbModel,
  getGlbModels,
];

export default glbModelTestSuite;
