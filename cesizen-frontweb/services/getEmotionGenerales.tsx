import { EmotionGenerale } from "@/types/database/emotionGenerales";

type Collection<T> = {
  member?: T[];
  "hydra:member"?: T[];
};

export default async function getEmotionGenerales(): Promise<EmotionGenerale[]> {
  const res = await fetch("/api/emotion_generales");
  if (!res.ok) throw new Error(`Erreur API: ${res.status}`);

  const data: Collection<EmotionGenerale> = await res.json();
  const items = data.member ?? data["hydra:member"] ?? [];

  return items;
}