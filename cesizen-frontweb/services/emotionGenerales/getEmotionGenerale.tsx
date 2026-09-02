import { EmotionGenerale } from "@/types/database/emotionGenerales";
import { apiFetch } from "../apiFetch";

export default async function getEmotionGenerale(
  id: string
): Promise<EmotionGenerale> {
  const res = await apiFetch(`/api/emotion_generales/${id}`);

  const data: EmotionGenerale = await res.json();

  return data;
}