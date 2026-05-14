import { Emotion } from "@/types/database/emotions";

export default async function getEmotion(
  id: string
): Promise<Emotion> {
  const res = await fetch(`/api/emotions/${id}`);

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`);
  }

  const data: Emotion = await res.json();

  return data;
}