import { API_URL } from "@/expo.config";
import { EmotionGenerale } from "@/types/database/emotionGenerales";

export default async function getEmotionGenerale(
  id: string,
): Promise<EmotionGenerale> {
  const res = await fetch(`${API_URL}/emotion_generales/${id}`);

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`);
  }

  const data: EmotionGenerale = await res.json();

  return data;
}
