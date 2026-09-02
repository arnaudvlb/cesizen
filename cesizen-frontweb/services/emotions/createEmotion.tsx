import { Emotion } from "@/types/database/emotions";
import { apiFetch } from "../apiFetch";

export default async function createEmotion(
  libelle: string,
  description: string,
  emotionGenerale: string,
): Promise<Emotion> {
  const res = await apiFetch("/api/emotions", {
    method: "POST",
    headers: {
      "Content-Type": "application/ld+json",
    },
    body: JSON.stringify({
      libelle,
      description,
      emotionGenerale,
    }),
  });

  const data: Emotion = await res.json();

  return data;
}
