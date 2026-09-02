import { apiFetch } from "../apiFetch";

export default async function deleteEmotion(id: number | null): Promise<void> {
  const res = await apiFetch(`/api/emotions/${id}`, {
    method: "DELETE",
  });
}