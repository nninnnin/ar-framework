import { randomBytes } from "crypto";

export function generateUid(): string {
  return randomBytes(16).toString("hex");
}
