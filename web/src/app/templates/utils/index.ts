import path from "path";
import { promises as fs } from "fs";

import {
  ProjectFormatted,
  ProjectType,
} from "@/features/project/types/project";
import TemplateContentsGenerator from "@/app/templates/utils/TemplateContentsGenerator";
import { getGlbModels } from "@/app/templates/utils/fetchers/glbModels";
import { getTargetImage } from "@/app/templates/utils/fetchers/targetImage";

export const generateArTemplate = async (
  projectItem: ProjectFormatted,
  {
    hasControls,
  }: {
    hasControls: boolean;
  }
) => {
  const templatePath = getTemplatePath(
    projectItem.projectType
  );

  const templateFile = await fs.readFile(
    templatePath,
    "utf-8"
  );

  const glbModels = await getGlbModels(
    projectItem.glbModels.map(
      (model: { uid: string }) => model.uid
    )
  );

  const targetImage = await (async function () {
    if (
      projectItem.imageTarget &&
      projectItem.imageTarget[0]
    ) {
      return await getTargetImage(
        projectItem.imageTarget[0].uid
      );
    }

    return null;
  })();

  const contentsFilledTemplate =
    new TemplateContentsGenerator(
      projectItem.projectType,
      templateFile,
      glbModels,
      targetImage.path
    ).generateTemplate({
      hasControls,
    });

  return contentsFilledTemplate;
};

const getTemplatePath = (projectType: ProjectType) => {
  const templatePathPrefix = path.resolve(
    process.cwd(),
    "src",
    "features",
    "template",
    "components"
  );

  const templateName = (function () {
    switch (projectType) {
      case "얼굴인식 AR":
        return path.resolve(
          templatePathPrefix,
          "face-tracking.html"
        );
      case "위치기반 AR":
        return path.resolve(
          templatePathPrefix,
          "location-based.html"
        );
      case "이미지마커 AR":
        return path.resolve(
          templatePathPrefix,
          "image-tracking.html"
        );
      default:
        throw new Error(
          `Invalid project type: ${projectType}`
        );
    }
  })();

  const templatePath = path.resolve(
    templatePathPrefix,
    templateName
  );

  return templatePath;
};
