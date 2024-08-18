import { toStringValue } from "../helpers/formatter.helper";

export function formatCorsOrigin(rawOrigin?: string): string[] {
  if (!rawOrigin) return [];
  const originArray = JSON.parse(rawOrigin) as string[];
  return originArray.map((origin) => toStringValue(origin));
}

export function formatCorsMethod(rawMethod?: string): string[] {
  if (!rawMethod) return [];
  const methodArray = JSON.parse(rawMethod) as string[];
  return methodArray.map((method) => toStringValue(method));
}
