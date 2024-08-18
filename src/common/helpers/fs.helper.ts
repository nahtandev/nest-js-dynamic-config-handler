import { accessSync } from "fs";

export function isAccessiblePathSync(path: string) {
  try {
    accessSync(path);
    return true;
  } catch {
    return false;
  }
}
