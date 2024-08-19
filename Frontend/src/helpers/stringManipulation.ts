export function addSpacesToCamelCase(str: string): string {
  return str.replace(/([A-Z])/g, " $1").trim();
}
