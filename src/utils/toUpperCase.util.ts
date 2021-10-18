export function toUpperCase(str: string) {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ""));
}
