import { Emotion } from "@/types/database/emotions";
import { apiFetch } from "../apiFetch";

export default async function getEmotion(
  id: string
): Promise<Emotion> {
  const res = await apiFetch(`/api/emotions/${id}`);

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`);
  }

  const data: Emotion = await res.json();

  return data;
}