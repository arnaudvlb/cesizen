import { API_URL } from "@/expo.config";
import { Rapport } from "@/types/database/rapports";

export default async function patchRapport(
  id: string,
  reponses: string,
  commentaire: string | null,
  dateRapport: string,
  emotionGenerale: string,
): Promise<Rapport> {
  const res = await fetch(`${API_URL}/rapports/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/merge-patch+json",
    },
    body: JSON.stringify({
      reponses,
      commentaire,
      dateRapport,
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
    } else {
      throw new Error(`Erreur API: ${res.status}`);
    }
  }

  const data: Rapport = await res.json();

  return data;
}
