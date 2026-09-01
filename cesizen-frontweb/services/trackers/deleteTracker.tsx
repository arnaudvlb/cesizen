import { apiFetch } from "../apiFetch";

export default async function deleteTracker(id: number | null): Promise<void> {
  const res = await apiFetch(`/api/trackers/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`);
  }
}