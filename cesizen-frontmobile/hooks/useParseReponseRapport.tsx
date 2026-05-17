export function useParseReponsesRapport(str?: string) {
  if (!str) return {};

  return str
    .split(",")
    .map(Number)
    .reduce((acc, emotionId, index) => {
      acc[index] = emotionId;
      return acc;
    }, {} as Record<number, number>);
}