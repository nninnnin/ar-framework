import { boolean, jsonb, pgTable, text } from "drizzle-orm/pg-core";

export const arProjects = pgTable("arProjects", {
  uid: text("uid").primaryKey(),
  createdAt: text("created_at"),
  updatedAt: text("updated_at"),
  name: jsonb("name"),
  projectType: jsonb("projectType"),
  glbModels: jsonb("glbModels"),
  groupName: jsonb("groupName"),
  imageTarget: jsonb("imageTarget"),
  templateId: text("templateId"),
  isLocked: boolean("isLocked"),
  isDeleted: boolean("isDeleted"),
});

export const glbModels = pgTable("glbModels", {
  uid: text("uid").primaryKey(),
  createdAt: text("created_at"),
  updatedAt: text("updated_at"),
  name: jsonb("name"),
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
  name: jsonb("name"),
});
