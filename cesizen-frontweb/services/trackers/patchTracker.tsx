import { Tracker } from "@/types/database/trackers";
import { apiFetch } from "../apiFetch";

export default async function patchTracker(
  id: string,
  dateDebut: string,
  dateFin: string,
  libelle: string,
  description: string | null,
): Promise<Tracker> {
  const res = await apiFetch(`/api/trackers/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/merge-patch+json",
    },
    body: JSON.stringify({
      dateDebut,
      dateFin,
      libelle,
      description,
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

  const data: Tracker = await res.json();

  return data;
}