import { EmotionGenerale } from "@/types/database/emotionGenerales";
import { apiFetch } from "../apiFetch";

export default async function createEmotionGenerale(
  libelle: string,
  description: string,
  couleur: string,
): Promise<EmotionGenerale> {
  const res = await apiFetch("/api/emotion_generales", {
    method: "POST",
    headers: {
      "Content-Type": "application/ld+json",
    },
    body: JSON.stringify({
      libelle,
      description,
      couleur,
    }),
  });

  const data: EmotionGenerale = await res.json();

  return data;
}
