import { z } from "zod";

const languageMapSchema = z.object({
  KO: z.string().nullable().default("").transform(v => v ?? ""),
});

const projectTypeEntrySchema = z.object({
  _id: z.number(),
  languageMap: languageMapSchema,
});

const relationEntrySchema = z.object({
  uid: z.string(),
  languageMap: languageMapSchema,
});

const relationArraySchema = z.preprocess(
  (arr) =>
    Array.isArray(arr)
      ? arr.filter((item) => typeof item === "object" && item !== null)
      : arr,
  z.array(relationEntrySchema).nullable(),
);

export const projectSchema = z.object({
  uid: z.string(),
  createdAt: z.string().nullable(),
  updatedAt: z.string().nullable(),
  name: languageMapSchema.nullable(),
  projectType: z.array(projectTypeEntrySchema).nullable(),
  glbModels: relationArraySchema,
  groupName: relationArraySchema,
  imageTarget: relationArraySchema,
  templateId: z.string().nullable().transform(v => v ?? ""),
  isLocked: z.boolean().nullable().transform(v => v ?? false),
  isDeleted: z.boolean().nullable().transform(v => v ?? false),
});

