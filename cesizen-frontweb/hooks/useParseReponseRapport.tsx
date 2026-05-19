export function useParseReponsesRapport(str: string): number[] {
  return str
    .split(",")
    .map(Number)
    .filter((n) => !Number.isNaN(n));
}