import { Emotion } from "@/types/database/emotions";
import { apiFetch } from "../apiFetch";

type Collection<T> = {
  member?: T[];
  "hydra:member"?: T[];
};

export default async function getEmotions(): Promise<Emotion[]> {
  const res = await apiFetch("/api/emotions/");
  
  const data: Collection<Emotion> = await res.json();
  const items = data.member ?? data["hydra:member"] ?? [];

  return items;
}