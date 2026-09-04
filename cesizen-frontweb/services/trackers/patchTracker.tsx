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

  const data: Tracker = await res.json();

  return data;
}