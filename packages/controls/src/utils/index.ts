import { TemplateType } from "../types";

export const getTemplateType = (
  title: string
): TemplateType => {
  if (title.includes("location")) {
    return "ar-location";
  }

  if (title.includes("face")) {
    return "ar-face";
  }

  return "ar-image";
};
