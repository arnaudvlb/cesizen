import { Emotion } from "@/types/database/emotions";
import { apiFetch } from "../apiFetch";

export default async function patchEmotion(
  id: string,
  libelle: string,
  description: string,
  emotionGenerale: string,
): Promise<Emotion> {
  const res = await apiFetch(`/api/emotions/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/merge-patch+json",
    },
    body: JSON.stringify({
      libelle,
      description,
      emotionGenerale,
    }),
  });

  if (!res.ok) {
    if (res.status === 400) {
      throw new Error("Données invalides.");
    } else if (res.status === 403) {
      throw new Error("Accès non autorisé.");
    } else if (res.status === 404) {
      throw new Error("Ressource introuvable."); 
    } else if (res.status === 500) {
      throw new Error("Veuillez compléter le formulaire.");
    } else {
      throw new Error(`Erreur API: ${res.status}`);
    }
  }

  const data: Emotion = await res.json();

  return data;
}
