import { Emotion } from "@/types/database/emotions";
import { apiFetch } from "../apiFetch";

export default async function getEmotion(
  id: string
): Promise<Emotion> {
  const res = await apiFetch(`/api/emotions/${id}`);

  const data: Emotion = await res.json();

  return data;
}