const str = (v: unknown): string => (v as string) ?? "";
const bool = (v: unknown): boolean => v === "true" || v === true;

export function toGlbModelValues(data: Record<string, unknown>) {
  return {
    name: data.name,
    mediaPath: str(data.mediaPath),
    isDeleted: bool(data.isDeleted),
    visibility: bool(data.visibility),
    latitude: str(data.latitude),
    longitude: str(data.longitude),
    scale: str(data.scale),
    rotation: str(data.rotation),
    position: str(data.position),
    interactions: str(data.interactions),
  };
}
