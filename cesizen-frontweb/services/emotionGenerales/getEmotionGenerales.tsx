import { EmotionGenerale } from "@/types/database/emotionGenerales";
import { apiFetch } from "../apiFetch";

type Collection<T> = {
  member?: T[];
  "hydra:member"?: T[];
};

export default async function getEmotionGenerales(): Promise<EmotionGenerale[]> {
  const res = await apiFetch("/api/emotion_generales");

  const data: Collection<EmotionGenerale> = await res.json();
  const items = data.member ?? data["hydra:member"] ?? [];

  return items;
}