import { API_URL } from "@/expo.config";
import { Emotion } from "@/types/database/emotions";

type Collection<T> = {
  member?: T[];
  "hydra:member"?: T[];
};

export default async function getEmotionsByEmotionGenerale(): Promise<
  Emotion[]
> {
  const res = await fetch(`${API_URL}/emotions/`);
  if (!res.ok) throw new Error(`Erreur API: ${res.status}`);

  const data: Collection<Emotion> = await res.json();
  const items = data.member ?? data["hydra:member"] ?? [];

  return items;
}
