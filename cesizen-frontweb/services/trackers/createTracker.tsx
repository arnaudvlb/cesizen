import { Tracker } from "@/types/database/trackers";
import { apiFetch } from "../apiFetch";

export default async function createTracker(
  dateDebut: string,
  dateFin: string,
  libelle: string,
  description: string | null,
): Promise<Tracker> {
  const res = await apiFetch("/api/trackers", {
    method: "POST",
    headers: {
      "Content-Type": "application/ld+json",
    },
    body: JSON.stringify({
      dateDebut,
      dateFin,
      libelle,
      description,
    }),
  });

  const data: Tracker = await res.json();

  return data;
}
