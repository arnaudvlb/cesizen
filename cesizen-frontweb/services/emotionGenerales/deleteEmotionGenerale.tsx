import { apiFetch } from "../apiFetch";

export default async function deleteEmotionGenerale(
  id: number | null,
): Promise<void> {
  await apiFetch(`/api/emotion_generales/${id}`, {
    method: "DELETE",
  });
}
