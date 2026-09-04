import { apiFetch } from "../apiFetch";

export default async function deleteEmotion(id: number | null): Promise<void> {
  await apiFetch(`/api/emotions/${id}`, {
    method: "DELETE",
  });
}
