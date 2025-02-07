import path from "path";
import { promises as fs } from "fs";

import {
  ProjectFormatted,
  ProjectType,
} from "@/types/project";
import TemplateContentsGenerator from "@/app/templates/utils/TemplateContentsGenerator";
import { getGlbModels } from "@/app/templates/utils/fetcher";

export const generateArTemplate = async (
  projectItem: ProjectFormatted
) => {
  const templatePath = getTemplatePath(
    projectItem.projectType
  );

  const templateFile = await fs.readFile(
    templatePath,
    "utf-8"
  );

  console.log(projectItem);

  const glbModels = await getGlbModels(
    projectItem.glbModels.map(
      (model: { uid: string }) => model.uid
    )
  );

  console.log("이거", glbModels);

  const contentsFilledTemplate =
    new TemplateContentsGenerator(
      projectItem.projectType,
      templateFile,
      glbModels
    ).generateTemplate();

  return contentsFilledTemplate;
};

const getTemplatePath = (projectType: ProjectType) => {
  const templatePathPrefix = path.resolve(
    process.cwd(),
    "src",
    "assets",
    "templates"
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
    }
  })();

  const templatePath = path.resolve(
    templatePathPrefix,
    templateName
  );

  return templatePath;
};
