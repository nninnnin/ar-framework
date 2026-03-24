import { boolean, jsonb, pgTable, text } from "drizzle-orm/pg-core";

export type LanguageMap = { KO?: string };
export type ProjectTypeEntry = { _id: number; languageMap: LanguageMap };
export type RelationEntry = { uid: string; languageMap: LanguageMap };

export const arProjects = pgTable("arProjects", {
  uid: text("uid").primaryKey(),
  createdAt: text("created_at"),
  updatedAt: text("updated_at"),
  name: jsonb("name").$type<LanguageMap>(),
  projectType: jsonb("projectType").$type<ProjectTypeEntry[]>(),
  glbModels: jsonb("glbModels").$type<RelationEntry[]>(),
  groupName: jsonb("groupName").$type<RelationEntry[]>(),
  imageTarget: jsonb("imageTarget").$type<RelationEntry[]>(),
  templateId: text("templateId"),
  isLocked: boolean("isLocked"),
  isDeleted: boolean("isDeleted"),
});

export const glbModels = pgTable("glbModels", {
  uid: text("uid").primaryKey(),
  createdAt: text("created_at"),
  updatedAt: text("updated_at"),
  name: jsonb("name").$type<LanguageMap>(),
  mediaPath: text("mediaPath"),
  isDeleted: boolean("isDeleted"),
  visibility: boolean("visibility"),
  latitude: text("latitude"),
  longitude: text("longitude"),
  scale: text("scale"),
  rotation: text("rotation"),
  position: text("position"),
  interactions: text("interactions"),
});

export const projectGroups = pgTable("projectGroups", {
  uid: text("uid").primaryKey(),
  createdAt: text("created_at"),
  updatedAt: text("updated_at"),
  name: jsonb("name").$type<LanguageMap>(),
});
