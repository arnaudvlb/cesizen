import { apiFetch } from "../apiFetch";

export async function uploadEmotionImage(
  file: File,
  id: Number,
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await apiFetch(`/api/emotions/${id}/upload`, {
    method: "POST",
    body: formData,
  });
  
  const data = await res.json();

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`);
  }

  return data.filename;
}
