import { API_URL } from "@/expo.config";
import { Tracker } from "@/types/database/trackers";
import * as SecureStore from "expo-secure-store";

export default async function createTracker(
  dateDebut: string,
  dateFin: string,
  libelle: string,
  description: string | null,
): Promise<Tracker> {
  const res = await fetch(`${API_URL}/trackers`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
      "Content-Type": "application/ld+json",
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
    } else if (res.status === 500) {
      throw new Error("Veuillez compléter le formulaire.");
    } else {
      throw new Error(`Erreur API: ${res.status}`);
    }
  }

  const data: Tracker = await res.json();

  return data;
}
