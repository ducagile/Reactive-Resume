import { createId, isCuid } from "@paralleldrive/cuid2";

export function replaceCuid2Placeholders(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(item => replaceCuid2Placeholders(item));
  } else if (typeof obj === "object" && obj !== null) {
    const newObj: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      newObj[key] =
        key === "id" && (typeof value !== "string" || !isCuid(value))
          ? createId()
          : replaceCuid2Placeholders(value);
    }
    return newObj;
  }
  return obj;
}
