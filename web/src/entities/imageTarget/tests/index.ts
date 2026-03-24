import { TestSuite } from "@/shared/types/test";
import { getImageTargetList } from "@/entities/imageTarget/tests/getImageTargets";
import { getImageTarget } from "@/entities/imageTarget/tests/getImageTarget";
import { createImageTargetTest } from "@/entities/imageTarget/tests/createImageTarget";
import { removeImageTargetTest } from "@/entities/imageTarget/tests/removeImageTarget";

const imageTargetTestSuite: TestSuite = [
  getImageTargetList,
  getImageTarget,
  createImageTargetTest,
  removeImageTargetTest,
];

export default imageTargetTestSuite;
