import { apiFetch } from "../apiFetch";

export default async function deleteUtilisateur(id: number | null): Promise<void> {
  const res = await apiFetch(`/api/utilisateurs/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`);
  }
}