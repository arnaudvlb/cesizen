import { EmotionGenerale } from "@/types/database/emotionGenerales";
import { apiFetch } from "../apiFetch";

export default async function patchEmotionGenerale(
  id: string,
  libelle: string,
  description: string,
  couleur: string,
): Promise<EmotionGenerale> {
  const res = await apiFetch(`/api/emotion_generales/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/merge-patch+json",
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
