import { apiFetch } from "../apiFetch";

export default async function deleteTracker(id: number | null): Promise<void> {
  await apiFetch(`/api/trackers/${id}`, {
    method: "DELETE",
  });
}
