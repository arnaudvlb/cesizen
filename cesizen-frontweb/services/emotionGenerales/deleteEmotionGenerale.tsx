import { apiFetch } from "../apiFetch";

export default async function deleteEmotionGenerale(id: number | null): Promise<void> {
  const res = await apiFetch(`/api/emotion_generales/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`);
  }
}