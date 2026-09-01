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
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/ld+json",
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
