import { apiFetch } from "../apiFetch";

export default async function deleteRapport(id: number | null): Promise<void> {
  await apiFetch(`/api/rapports/${id}`, {
    method: "DELETE",
  });
}
