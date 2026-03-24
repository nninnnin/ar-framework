import { z } from "zod";

const languageMapSchema = z.object({
  KO: z.string().default(""),
});

const projectTypeEntrySchema = z.object({
  _id: z.number(),
  languageMap: languageMapSchema,
});

const relationEntrySchema = z.object({
  uid: z.string(),
  languageMap: languageMapSchema,
});

export const projectSchema = z.object({
  uid: z.string(),
  createdAt: z.string().nullable(),
  updatedAt: z.string().nullable(),
  name: languageMapSchema.nullable(),
  projectType: z.array(projectTypeEntrySchema).nullable(),
  glbModels: z.array(relationEntrySchema).default([]),
  groupName: z.array(relationEntrySchema).nullable(),
  imageTarget: z.array(relationEntrySchema).nullable(),
  templateId: z.string().nullable().transform(v => v ?? ""),
  isLocked: z.boolean().nullable().transform(v => v ?? false),
  isDeleted: z.boolean().nullable().transform(v => v ?? false),
});

