import { getGlbModel } from "@/entities/glbModel/tests/getGlbModel";
import { getGlbModels } from "@/entities/glbModel/tests/getGlbModels";
import { removeGlbModel } from "@/entities/glbModel/tests/removeGlbModel";

import { TestSuite } from "@/shared/types/test";

const glbModelTestSuite: TestSuite = [
  getGlbModel,
  getGlbModels,
  removeGlbModel,
];

export default glbModelTestSuite;
