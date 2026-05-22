import { EmotionGenerale } from "@/types/database/emotionGenerales";

export default async function patchEmotionGenerale(
  id: string,
  libelle: string,
  description: string,
  couleur: string,
): Promise<EmotionGenerale> {
  const res = await fetch(`/api/emotion_generales/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/merge-patch+json",
    },
    body: JSON.stringify({
      libelle,
      description,
      couleur,
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

  const data: EmotionGenerale = await res.json();

  return data;
}
